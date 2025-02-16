import { Module } from '@nestjs/common'; //k
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; //
import { ConfigModule, ConfigService } from '@nestjs/config'; //
import { AuthModule } from './auth/auth.module';
import { ElecteursModule } from './electeurs/electeurs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //Pour acceder aux variables .env dans toute l'application
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        migrationsRun: true,
      }),
  }), AuthModule, ElecteursModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
