import { Test, TestingModule } from '@nestjs/testing';
import { ResepService } from './resep.service';
import { Tbl_resep } from './resep.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
describe('ResepService', () => {
  let service: ResepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResepService, {
        provide: getRepositoryToken(Tbl_resep),
        useValue: {
          save: jest.fn().mockResolvedValue(Tbl_resep),
          find: jest.fn().mockResolvedValue([Tbl_resep]),
        },
      }],
    }).compile();

    service = module.get<ResepService>(ResepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
