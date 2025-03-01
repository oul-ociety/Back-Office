import { Module } from '@nestjs/common';
import { ElecteursController } from './electeurs.controller';
import { ElecteursService } from './electeurs.service';

@Module({
  controllers: [ElecteursController],
  providers: [ElecteursService]
})
export class ElecteursModule {}
