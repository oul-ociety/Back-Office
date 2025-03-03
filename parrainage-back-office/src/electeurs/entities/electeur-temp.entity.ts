import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('electeurs_temp')
export class ElecteurTemp {
      
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
  
    @Column({ type: 'varchar', length: 50 })
    carte_electeur: string;
  
    @Column({ type: 'varchar', length: 50 })
    carte_cni: string;

    @Column({ type: 'enum', enum: ['en_attente', 'valide', 'rejete'], default: 'en_attente' })
    statut: string;

    @Column({ type: 'text', nullable: true })
    erreur?: string | null;

    @CreateDateColumn()
    date_import: Date;
}
