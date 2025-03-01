import { Test, TestingModule } from '@nestjs/testing';
import { CandidatsController } from './candidats.controller';

describe('CandidatsController', () => {
  let controller: CandidatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidatsController],
    }).compile();

    controller = module.get<CandidatsController>(CandidatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
