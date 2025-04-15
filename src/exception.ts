import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpExceptionOptions, Logger, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionWithCode extends HttpException {
    @ApiProperty()
    errorCode: string;

    constructor(
        response: string | Record<string, any>,
        status: number,
        errorCode: string,
        options?: HttpExceptionOptions,
    ) {
        super(response, status, options);
        this.errorCode = errorCode;
    }

    getErrorCode() {
        return this.errorCode;
    }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status: number;
        let errorResponse: Record<string, any>;
        let errorCode: string;

        if (exception instanceof HttpExceptionWithCode) {
            status = exception.getStatus();
            errorCode = exception.getErrorCode();  // 이미 있는 errorCode 사용
            errorResponse = this.formatErrorResponse(status, errorCode, exception.getResponse());
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            errorCode = this.mapStatusToErrorCode(status);  // status에 따라 기본 errorCode 설정
            errorResponse = this.formatErrorResponse(status, errorCode, exception.getResponse());
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            errorCode = 'unknown_error';  // 기본값
            errorResponse = this.formatErrorResponse(status, errorCode, '알 수 없는 에러가 발생하였습니다.');
            this.logger.error(exception);
        }

        // 로깅
        this.logger.error(`${request.method} ${request.url}`, errorResponse);

        response.status(status).json(errorResponse);
    }

    private formatErrorResponse(status: number, errorCode: string, message: string | object): Record<string, any> {
        const response: Record<string, any> = {
            statusCode: status,
            message: this.formatMessage(message),
            errorCode,  // errorCode 항상 포함
        };

        if (typeof message === 'object' && message !== null && 'error' in message) {
            response.error = message['error'];
        } else {
            response.error = HttpStatus[status];
        }

        return response;
    }

    private formatMessage(message: string | object): string | string[] {
        if (typeof message === 'string') {
            return message;
        }
        if (Array.isArray(message)) {
            return message;
        }
        if (typeof message === 'object' && message !== null) {
            if ('message' in message && (typeof message['message'] === 'string' || typeof message['message'] === 'object')) {
                return this.formatMessage(message['message']);
            }
        }
        return JSON.stringify(message);
    }

    // 상태 코드에 따른 기본 errorCode 맵핑
    private mapStatusToErrorCode(status: number): string {
        switch (status) {
            case HttpStatus.BAD_REQUEST:
                return 'bad_request';
            case HttpStatus.UNAUTHORIZED:
                return 'unauthorized';
            case HttpStatus.FORBIDDEN:
                return 'forbidden';
            case HttpStatus.NOT_FOUND:
                return 'not_found';
            default:
                return 'error';
        }
    }
}
