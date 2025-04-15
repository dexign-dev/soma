import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type, Expose } from 'class-transformer';
import { IsString, IsOptional, IsEnum, IsInt, IsNotEmpty, IsUUID, IsDate } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export enum NoticePaginateSort {
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    title = 'title',
}

export enum PrismaOrder {
    asc = 'asc',
    desc = 'desc',
}

export class NoticePaginationQuery extends PaginationDto {
    @ApiPropertyOptional({
        description: '키워드 검색 (제목 또는 내용으로 검색)'
    })
    @IsString()
    @IsOptional()
    readonly keyword?: string;
}

export class NoticeDto {
    @ApiProperty({ description: '공지사항 ID', example: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    readonly id: string;

    @ApiProperty({ description: '공지사항 제목', example: '중요 공지사항' })
    @IsString()
    @IsNotEmpty()
    @Expose()
    readonly title: string;

    @ApiProperty({ description: '공지사항 내용', example: '공지사항 내용입니다.' })
    @IsString()
    @IsNotEmpty()
    @Expose()
    readonly content: string;

    @ApiProperty({ description: '생성 날짜' })
    @IsDate()
    @Type(() => Date)
    @Expose()
    readonly createdAt: Date;

    @ApiProperty({ description: '수정 날짜' })
    @IsDate()
    @Type(() => Date)
    @Expose()
    readonly updatedAt: Date;
}

export class CreateNoticeDto extends OmitType(NoticeDto, ['id', 'createdAt', 'updatedAt'] as const) { }

export class UpdateNoticeDto extends PartialType(CreateNoticeDto) { }

export class NoticeCommentDto {
    @ApiProperty({ description: '댓글 ID', example: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    readonly id: string;

    @ApiProperty({ description: '댓글 내용', example: '좋은 공지사항입니다.' })
    @IsString()
    @IsNotEmpty()
    @Expose()
    readonly content: string;

    @ApiProperty({ description: '작성자 ID', example: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    readonly userId: string;

    @ApiProperty({ description: '공지사항 ID', example: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    @Expose()
    readonly noticeId: string;

    @ApiProperty({ description: '생성 날짜' })
    @IsDate()
    @Type(() => Date)
    @Expose()
    readonly createdAt: Date;

    @ApiProperty({ description: '수정 날짜' })
    @IsDate()
    @Type(() => Date)
    @Expose()
    readonly updatedAt: Date;
}

export class CreateNoticeCommentDto extends OmitType(NoticeCommentDto, ['id', 'userId', 'noticeId', 'createdAt', 'updatedAt'] as const) { }

export class UpdateNoticeCommentDto extends PartialType(CreateNoticeCommentDto) { }