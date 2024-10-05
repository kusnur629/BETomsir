import { Test, TestingModule } from '@nestjs/testing';
import { BahanbakuController } from './bahanbaku.controller';

describe('BahanbakuController', () => {
  let controller: BahanbakuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BahanbakuController],
    }).compile();

    controller = module.get<BahanbakuController>(BahanbakuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
