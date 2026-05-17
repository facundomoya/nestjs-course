import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(FileInterceptor('file', { fileFilter: fileFilter }))
  uploadFile(@UploadedFile() file: Express.Multer.File){
    if(!file) {
      throw new BadRequestException('File is empty or has an invalid extension');
    }
    return {
      fileName: file.originalname
    }
  }
}
