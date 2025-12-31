import { Type } from 'class-transformer';
import { IsNumber, Min, IsString, MinLength } from 'class-validator';

export class CreatePokemonDto {

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    no: number;

    @IsString()
    @MinLength(1)
    name: string;
}
