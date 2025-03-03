import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('electeurs')
export class Electeur {
    @PrimaryGeneratedColumn()
    id_electeur: number;

    @Column({ type: 'varchar', length: 50 })
    nom: string;

    @Column({ type: 'varchar', length: 50 })
    prenom: string;

    @Column({ type: 'date' })
    date_naissance: Date;

    @Column({ type: 'varchar', length: 100 })
    lieu_naissance: string;

    @Column({ type: 'enum', enum: ['M', 'F'] })
    sexe: 'M' | 'F';

    @Column({ type: 'varchar', length: 50, unique: true })
    carte_electeur: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    carte_cni: string;

    @CreateDateColumn()
    date_enregistrement: Date;
}
