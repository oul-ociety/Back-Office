import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import type { Express } from 'express';

@Controller('electeurs')
export class ElecteursController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Intercepteur Multer pour gérer le fichier
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    if (!file) {
      throw new BadRequestException('Aucun fichier reçu');
    }

    console.log('Fichier reçu :', file.originalname);
    console.log('Checksum reçu :', body.checksum);

    // Lire le fichier et calculer son empreinte SHA256
    const fileBuffer = fs.readFileSync(file.path);
    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    console.log('SHA256 calculé :', hash);

    // Vérifier si le SHA256 correspond à celui envoyé par l'utilisateur
    if (hash !== body.checksum) {
      throw new BadRequestException('Le fichier est corrompu ou son empreinte est incorrecte.');
    }

    return { message: 'Upload réussi', filename: file.filename };
  }
}
