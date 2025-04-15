import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  @HttpCode(200) // HTTP 200 상태 코드 명시적으로 설정
  getHealthCheck(): string {
    return 'OK'; // HTTP 200 응답과 함께 반환될 메시지
  }
}
