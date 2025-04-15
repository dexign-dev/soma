import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
export class UserDto {
    @ApiProperty()
    @IsUUID()
    @Expose()
    id: string;

    @ApiProperty()
    @IsEmail()
    @Expose()
    email: string;

    @ApiProperty()
    @IsString()
    @Expose()
    name: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    @Expose()
    isAdmin?: boolean;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @Expose()
    providerId?: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    @Expose()
    agreementComplete?: boolean;


    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    @Expose()
    agreementTermsOfService?: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    @Expose()
    agreementCollectPersonal?: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    @Expose()
    agreementMarketing?: boolean;

    @ApiProperty()
    @IsDate()
    @Expose()
    createdAt: Date;

    @ApiProperty()
    @IsDate()
    updatedAt: Date;

    @ApiPropertyOptional()
    @IsDate()
    @IsOptional()
    deletedAt?: Date;
}