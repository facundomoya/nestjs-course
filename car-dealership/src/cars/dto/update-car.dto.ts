import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateCarDto {

    @IsString()
    @IsOptional()
    @IsUUID()
    readonly id?: string;
    
    @IsString()
    @IsOptional()
    @IsUUID()
    readonly brand?: string;

    @IsString()
    @IsOptional()
    @IsUUID()
    readonly model?: string;
}