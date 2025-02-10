import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElecteursModule } from './electeurs/electeurs.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'passer',
      database: 'backoffice_db',
      entities: [__dirname + '/**/*.entity{.ts, .js}'],
      synchronize: true,
    }),
    ElecteursModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
