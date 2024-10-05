import { Test, TestingModule } from '@nestjs/testing';
import { BahanbakuService } from './bahanbaku.service';
import { Tbl_bahanbaku } from './bahanbaku.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
describe('BahanbakuService', () => {
  let service: BahanbakuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BahanbakuService, {
        provide: getRepositoryToken(Tbl_bahanbaku),
        useValue: {
          save: jest.fn().mockResolvedValue(Tbl_bahanbaku),
          find: jest.fn().mockResolvedValue([Tbl_bahanbaku]),
        },
      }],
    }).compile();

    service = module.get<BahanbakuService>(BahanbakuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
