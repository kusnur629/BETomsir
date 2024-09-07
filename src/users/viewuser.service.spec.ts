import { Test, TestingModule } from '@nestjs/testing';
import { ViewuserService } from './viewuser.service';
import { Viewuser } from './viewuser.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
describe('ViewuserService', () => {
  let service: ViewuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViewuserService, {
        provide: getRepositoryToken(Viewuser),
        useValue: {
          save: jest.fn().mockResolvedValue(Viewuser),
          find: jest.fn().mockResolvedValue([Viewuser]),
        },
      }],
    }).compile();

    service = module.get<ViewuserService>(ViewuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
