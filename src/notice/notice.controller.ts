import { Controller, UseGuards } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
;

@ApiTags('notice')
@Controller('notice')
@UseGuards(JwtAuthGuard)
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) { }
}
