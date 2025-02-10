import { Test, TestingModule } from '@nestjs/testing';
import { ElecteursController } from './electeurs.controller';

describe('ElecteursController', () => {
  let controller: ElecteursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElecteursController],
    }).compile();

    controller = module.get<ElecteursController>(ElecteursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
