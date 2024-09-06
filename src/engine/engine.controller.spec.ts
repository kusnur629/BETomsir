import { Test, TestingModule } from '@nestjs/testing';
import { EngineController } from './engine.controller';

describe('OyPgController', () => {
  let controller: EngineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EngineController],
    }).compile();

    controller = module.get<EngineController>(EngineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});