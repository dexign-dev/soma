import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: '이메일', example: 'test@test.com' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty({ description: '비밀번호', example: "test1234" })
    password: string;
}
export class AccessTokenDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'sns 엑세스 토큰' })
    accessToken: string;
}

export class RefreshTokenDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: '리프레시 토큰' })
    refreshToken: string;
}
