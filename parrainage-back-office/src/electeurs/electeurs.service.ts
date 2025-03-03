import { Repository } from 'typeorm';
import { ElecteurTemp } from './entities/electeur-temp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { Electeur } from './entities/electeur.entity';

@Injectable()
export class ElecteursService {
    constructor(
        @InjectRepository(ElecteurTemp)
        private readonly electeurTempRepository: Repository<ElecteurTemp>,
        
        @InjectRepository(Electeur)
        private readonly electeurRepository: Repository<Electeur>,
    ) {}

  private etatUploadElecteur = true;

  /**
   * Vérifie les données du fichier CSV et classe les électeurs en valides ou rejetés.
   */
    async controlerElecteurs(filePath: string): Promise<{ valides: ElecteurTemp[]; rejetes: ElecteurTemp[] }> {
        return new Promise((resolve, reject) => {
            const valides: ElecteurTemp[] = [];
            const rejetes: ElecteurTemp[] = [];

            fs.createReadStream(filePath)
                .pipe(csv({ separator: ',' }))
                .on('data', async (row) => {
                    const { ID, Nom, Prenom, DateNaissance, LieuNaissance, Sexe, CarteElecteur, CarteCNI } = row;

                    let erreur: string | null = null;

                    if (!ID || !Nom || !Prenom || !DateNaissance || !LieuNaissance || !Sexe || !CarteElecteur || !CarteCNI) {
                        erreur = 'Données incomplètes';
                    }

                    if (!['M', 'F'].includes(Sexe)) {
                        erreur = 'Sexe invalide';
                    }

                    if (CarteElecteur.length !== 9 || CarteCNI.length !== 10) {
                        erreur = 'Format de carte incorrect';
                    }

                    const exists = await this.electeurTempRepository.findOne({ where: { carte_cni: CarteCNI } });
                    if (exists) {
                        erreur = 'Électeur déjà enregistré';
                    }

                    const electeur: ElecteurTemp = this.electeurTempRepository.create({
                        id_electeur: Number(ID),
                        nom: Nom,
                        prenom: Prenom,
                        date_naissance: new Date(DateNaissance),
                        lieu_naissance: LieuNaissance,
                        sexe: Sexe as 'M' | 'F',
                        carte_electeur: CarteElecteur,
                        carte_cni: CarteCNI,
                        statut: erreur ? 'rejete' : 'valide',
                        erreur: erreur || undefined,
                    });

                    if (erreur) {
                        rejetes.push(electeur);
                    } else {
                        valides.push(electeur);
                    }
                })
                .on('end', () => resolve({ valides, rejetes }))
                .on('error', (error) => reject(error));
        });
    }



    async saveElecteurTemp(
      id_electeur: number,
      nom: string,
      prenom: string,
      date_naissance: Date,
      lieu_naissance: string,
      sexe: 'M' | 'F',
      carte_electeur: string,
      carte_cni: string,
      erreur: string | null
    ) {
      const statut = erreur ? 'rejete' : 'valide';
  
      const electeur = this.electeurTempRepository.create({
        nom: nom,
        prenom: prenom,
        date_naissance: new Date(date_naissance),
        lieu_naissance: lieu_naissance,
        sexe: sexe as 'M' | 'F',
        carte_electeur: carte_electeur,
        carte_cni: carte_cni,
        statut: erreur ? 'rejete' : 'valide',
        erreur: erreur || undefined,
    });   
  
      return await this.electeurTempRepository.save(electeur);
   }


  /**
   * Enregistre les électeurs dans la table temporaire.
   */
  async enregistrerElecteurs(filePath: string) {
    const { valides, rejetes } = await this.controlerElecteurs(filePath);

    if (rejetes.length > 0) {
        await this.electeurTempRepository.save(rejetes, { chunk: 100 });
    }

    if (valides.length > 0) {
        await this.electeurTempRepository.save(valides, { chunk: 100 });
    }

    return { valides: valides.length, rejetes: rejetes.length };
}


  /**
   * Valide définitivement l'importation en transférant les électeurs vers la table principale.
   */
  async validerImportation() {
    // Récupérer les électeurs validés
    const electeursValides = await this.electeurTempRepository.find({ where: { statut: 'valide' } });
    console.log(`Nombre d'électeurs valides: ${electeursValides.length}`);

    if (electeursValides.length > 0) {
        console.log('Enregistrement des électeurs dans la table principale...');
        await this.electeurRepository.save(electeursValides.map(elec => ({
            nom: elec.nom,
            prenom: elec.prenom,
            date_naissance: elec.date_naissance,
            lieu_naissance: elec.lieu_naissance,
            sexe: elec.sexe,
            carte_electeur: elec.carte_electeur,
            carte_cni: elec.carte_cni,
        })), { chunk: 100 });
        console.log('Électeurs enregistrés avec succès !');
    } else {
        console.log("Aucun électeur valide à transférer.");
    }


    // Supprimer les électeurs de la table temporaire
    await this.electeurTempRepository.createQueryBuilder()
        .delete()
        .where("statut = 'valide'")
        .execute();


    // Empêcher un nouvel upload
    this.etatUploadElecteur = false;

    return { message: 'Importation validée, table temporaire vidée et fichier supprimé.' };
  }

  /**
   * Gère l'upload du fichier CSV et démarre l'importation.
   */
  async uploadFile(file: Express.Multer.File) {
    if (!this.etatUploadElecteur) {
      throw new BadRequestException('L’importation a déjà été validée, un nouvel upload est interdit.');
    }

    return await this.enregistrerElecteurs(file.path);
  }
}