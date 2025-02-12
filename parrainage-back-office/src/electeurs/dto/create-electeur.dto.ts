import { IsNotEmpty, MinLength, IsEmail, IsOptional } from 'class-validator';

export class CreateElecteurDto {
    @IsNotEmpty()
    nom: string;

    @IsNotEmpty()
    prenom: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @MinLength(6)
    mot_de_passe: string;
}
