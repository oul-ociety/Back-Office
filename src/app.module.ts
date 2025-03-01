import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElecteursModule } from './electeurs/electeurs.module';
import { CandidatsModule } from './candidats/candidats.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Type de base de données
      host: 'localhost', // Hôte de la base de données
      port: 3306, // Port de la base de données
      username: 'root', // Nom d'utilisateur de la base de données
      password: '', // Mot de passe de la base de données
      database: 'backoffice_db', // Nom de la base de données
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Chemin des entités
      synchronize: true, // Synchronisation automatique (à désactiver en production)
    }),
    ElecteursModule,
    CandidatsModule,
    UploadModule,
  ],
  controllers: [AppController], // Contrôleurs de l'application
  providers: [AppService], // Services de l'application
})
export class AppModule {}