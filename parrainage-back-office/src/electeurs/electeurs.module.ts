import { Module } from '@nestjs/common';
import { ElecteursService } from './electeurs.service';
import { ElecteursController } from './electeurs.controller';

@Module({
  providers: [ElecteursService],
  controllers: [ElecteursController]
})
export class ElecteursModule {}
