import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { electeur } from './electeurs.entity';//importe l'entite pour que le service puisse interagir avec elle

@Injectable() //indique que cette classe est un service injectable
export class ElecteursService {
    constructor(
        @InjectRepository(electeur) //permet d'injecter le repository lié à l'entite Electeur
        private electeursRepository: Repository<electeur>,// permet d'effectuer des operations sur la table Electeur
    ) {} //on utilise this.electeursRepository pour interagir avec la base de données

    //Creation d'electeur
    async create(electeurData: Partial<electeur>): Promise<electeur> {
        const electeur = this.electeursRepository.create(electeurData);//cree un objet mais ne l'insere pas encore
        return await this.electeursRepository.save(electeur);//insere l'electeur dans la base de données et retourne l'objet sauvegarde
    }

    //recuperer tous les electeur
    async findAll(): Promise<electeur[]> {
        return await this.electeursRepository.find();
    }

    async findOne(id: number): Promise<electeur> {
        const idElecteur = await this.electeursRepository.findOneBy({ id }); //findOnBy recherche un electeur ayant cet id
        if (!idElecteur) {
            throw new NotFoundException('Electeur not found');
        }
        return idElecteur;
    }

    async update(id: number, updateData: Partial<electeur>): Promise<electeur> {
        await this.electeursRepository.update(id, updateData);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.electeursRepository.delete(id);
    }
}
