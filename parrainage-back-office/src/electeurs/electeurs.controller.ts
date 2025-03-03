import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as crypto from 'crypto';
import * as fs from 'fs';
import type { Express } from 'express';
import * as csvParser from 'csv-parser';  // 📌 Pour lire le CSV
import { ElecteursService } from './electeurs.service';
import * as iconv from 'iconv-lite';

@Controller('electeurs')
export class ElecteursController {
    constructor(private readonly electeursService: ElecteursService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
        if (!file) {
            throw new BadRequestException('Aucun fichier reçu');
        }

        if (!this.isUTF8(file.path)) {
            throw new BadRequestException('Le fichier doit etre encode en UTF-8.');
        }

        console.log('Fichier reçu :', file.originalname);
        console.log('Checksum reçu :', body.checksum);

        // Lire le fichier et calculer son empreinte SHA256
        const fileBuffer = fs.readFileSync(file.path);
        const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

        console.log('SHA256 calculé :', hash);

        if (hash !== body.checksum) {
            throw new BadRequestException('Le fichier est corrompu ou son empreinte est incorrecte.');
        }

        // Lire le contenu du fichier CSV
        const results = [];
        fs.createReadStream(file.path)
            .pipe(csvParser({ separator: ',' })) // 📌 Assure-toi que le séparateur est correct
            .on('data', async (row) => {
                console.log('Ligne CSV :', row);
                const { ID,Nom,Prenom,DateNaissance,LieuNaissance,Sexe,CarteElecteur,CarteCNI } = row;
                let erreur;

                // 📌 Vérification basique (on pourra améliorer plus tard)
                if (!ID || !Nom || !Prenom || !DateNaissance || !LieuNaissance || !Sexe || !CarteElecteur || !CarteCNI) {
                    erreur = 'Données incomplètes';
                }

                // 📌 Sauvegarder dans la table temporaire
                await this.electeursService.saveElecteurTemp(ID,Nom,Prenom,DateNaissance,LieuNaissance,Sexe,CarteElecteur,CarteCNI, erreur);
            })
        .on('end', () => {
            console.log('Importation terminée');
        });

        return { message: 'Fichier reçu et en cours de traitement' };
  }

    private isUTF8(filePath: string): boolean {
        const buffer = fs.readFileSync(filePath);
        const decodedText = iconv.decode(buffer, 'utf-8');
        const reEncoded = iconv.encode(decodedText, 'utf-8');
        return buffer.equals(reEncoded);
    }
}
