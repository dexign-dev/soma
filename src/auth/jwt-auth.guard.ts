//src/auth/jwt-auth.guard.ts
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenExpiredError, JsonWebTokenError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }

    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if (info instanceof TokenExpiredError) {
            throw new UnauthorizedException('auth token expired');
        }

        if (info instanceof JsonWebTokenError) {
            throw new UnauthorizedException('auth invalid token');

        }

        if (info?.message === 'No auth token') {
            throw new UnauthorizedException('auth invalid token');
        }

        return super.handleRequest(err, user, info, context, status);
    }


}