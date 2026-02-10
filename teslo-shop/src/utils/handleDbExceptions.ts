import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export function handleDBException(error: any) {
  // PostgreSQL error codes
  if (error?.code === '23505') {
    // unique violation    
    throw new ConflictException(
      'El registro ya existe. El valor ingresado debe ser único.',
    );
  }

  if (error?.code === '23503') {
    // foreign key violation
    throw new ConflictException(
      'No se puede realizar la operación porque existen relaciones asociadas.',
    );
  }

  if (error?.code === '23502') {
    // not null violation
    throw new BadRequestException(
      'Faltan datos obligatorios para completar la operación.',
    );
  }

  if (error?.code === '22P02') {
    // invalid text representation (ej: UUID inválido)
    throw new BadRequestException(
      'El formato del dato ingresado es inválido.',
    );
  }

  if (error?.code === '22001') {
    // string data right truncation
    throw new BadRequestException(
      'El valor ingresado excede la longitud permitida.',
    );
  }

  if (error?.code === '42601') {
    // syntax error
    throw new InternalServerErrorException(
      'Error de sintaxis en la consulta a la base de datos.',
    );
  }

  if (error?.code === '42P01') {
    // undefined table
    throw new InternalServerErrorException(
      'La tabla no existe en la base de datos.',
    );
  }

  if (error?.code === '42703') {
    // undefined column
    throw new InternalServerErrorException(
      'La columna consultada no existe.',
    );
  }

  // Error no contemplado
  throw new InternalServerErrorException(
    'Error inesperado en la base de datos.',
  );
}