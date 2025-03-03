import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElecteursService } from './electeurs.service';
import { ElecteursController } from './electeurs.controller';
import { ElecteurTemp } from './entities/electeur-temp.entity';
import { Electeur } from './entities/electeur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ElecteurTemp, Electeur])],
  controllers: [ElecteursController],
  providers: [ElecteursService],
  exports: [ElecteursService],
})
export class ElecteursModule {}