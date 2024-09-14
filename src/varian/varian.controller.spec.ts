import { Test, TestingModule } from '@nestjs/testing';
import { VarianController } from './varian.controller';

describe('VarianController', () => {
  let controller: VarianController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VarianController],
    }).compile();

    controller = module.get<VarianController>(VarianController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
