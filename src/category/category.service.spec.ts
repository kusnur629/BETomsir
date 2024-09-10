import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Tbl_category } from './category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, {
        provide: getRepositoryToken(Tbl_category),
        useValue: {
          save: jest.fn().mockResolvedValue(Tbl_category),
          find: jest.fn().mockResolvedValue([Tbl_category]),
        },
      }],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
