import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class NoticeService {
  constructor(@Inject('PRISMA') private prisma: PrismaService,) { }

}
