import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Pokemon extends Document {
    @Prop({
        unique: true,
        index: true,
        required: true,
    })
    name: string;
    @Prop({
        unique: true,
        index: true,
        required: true,
    })
    no: number;
}


export const PokemonSchema = SchemaFactory.createForClass(Pokemon);


//esta es la forma de las entities en mongoose con nestjs (la mayor parte de las veces)