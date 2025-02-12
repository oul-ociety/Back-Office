import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('electeur')
export class electeur {
    @PrimaryGeneratedColumn({ name: 'id_electeur' })
    id: number;

    @Column({ length: 50 })
    nom: string;

    @Column({ length: 50 })
    prenom: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ name: 'mot_de_passe', length: 255 })
    motDePasse: string;

    @CreateDateColumn({ name: 'date_inscription', type: 'datetime' })
    dateInscription: Date;

    @Column({ name: 'statut_validation', type: 'boolean', default: false })
    statutValidation: boolean;
}