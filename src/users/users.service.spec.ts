import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Tbl_user } from './users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: getRepositoryToken(Tbl_user),
        useValue: {
          save: jest.fn().mockResolvedValue(Tbl_user),
          find: jest.fn().mockResolvedValue([Tbl_user]),
        },
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
