import { Module } from '@nestjs/common';
import { ElecteursService } from './electeurs.service';
import { ElecteursController } from './electeurs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { electeur } from './electeurs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([electeur])],
  providers: [ElecteursService],
  controllers: [ElecteursController]
})
export class ElecteursModule {}