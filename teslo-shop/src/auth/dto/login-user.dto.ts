import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
    @ApiProperty({
        example: 'john.doe@example.com',
        description: 'User Email'
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'securePassword123',
        description: 'User Password',
        minLength: 6,
        maxLength: 20
    })
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}
