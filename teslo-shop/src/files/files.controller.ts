import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { Response } from 'express';
import { fileFilter } from './helpers/fileFilter.helper';
import { ConfigService } from '@nestjs/config';
import { fileNamer } from './helpers/fileNamer.helper';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly ConfigService: ConfigService
  ) { }

  @Get('/product/:imageName')
  findProductImages(
    @Res() res: Response, //nest can't infer the type of res, I gonna respond with the file (manually)
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticProductImage(imageName);
    res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter, storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is empty or has an invalid extension');
    }

    const secureUrl = `${this.ConfigService.get('HOST_API')}/files/product/${file.filename}`;
    return {
      fileName: file.originalname,
      secureUrl
    }
  }
}
