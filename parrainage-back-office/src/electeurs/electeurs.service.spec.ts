import { Test, TestingModule } from '@nestjs/testing';
import { ElecteursService } from './electeurs.service';

describe('ElecteursService', () => {
  let service: ElecteursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElecteursService],
    }).compile();

    service = module.get<ElecteursService>(ElecteursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
