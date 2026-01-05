import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ) { 
    this.defaultLimit = this.configService.get<number>('DEFAULT_LIMIT') || 7;
  }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0} = paginationDto;
    return await this.pokemonModel.find()
      .limit(limit)
      .skip(offset);
  }

  async findOne(term: string) {

    let pokemon: Pokemon | null = null;

    if (!isNaN(+term)) {
      //busqueda por numero
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }

    if (!pokemon && isValidObjectId(term)) {
      //busqueda por mongo id
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) {
      //busqueda por nombre
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    }


    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }
    try {
      const pokemonUpdated = await pokemon?.updateOne(updatePokemonDto);
      return pokemonUpdated;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    /* const pokemon = await this.findOne(id);
    await pokemon?.deleteOne(); */
    const {deletedCount} = await this.pokemonModel.deleteOne({ _id: id });
    if(deletedCount === 0){
      throw new InternalServerErrorException(`Pokemon with id ${id} not found`);
    }
    return { deletedCount };
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException("Check server logs");
  }
}
