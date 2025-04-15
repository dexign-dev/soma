import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {

    @ApiProperty({ description: '현재페이지', example: 1 })
    @Transform(({ value }) => +value)
    @IsPositive()
    @IsOptional()
    page: number;

    @ApiProperty({ description: '페이지 당 건수', example: 10 })
    @Transform(({ value }) => +value)
    @IsPositive()
    @IsOptional()
    limit: number;
}
