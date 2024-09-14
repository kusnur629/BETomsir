import { Test, TestingModule } from '@nestjs/testing';
import { SatuanController } from './satuan.controller';

describe('SatuanController', () => {
  let controller: SatuanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SatuanController],
    }).compile();

    controller = module.get<SatuanController>(SatuanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
