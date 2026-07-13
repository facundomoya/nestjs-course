import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        example: 'john.doe@example.com',
        description: 'User Email',
        uniqueItems: true
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

    @ApiProperty({
        example: 'John Doe',
        description: 'User Full Name',
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    fullName: string;
}
