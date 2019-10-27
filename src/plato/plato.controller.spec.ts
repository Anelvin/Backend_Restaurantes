import { Test, TestingModule } from '@nestjs/testing';
import { PlatoController } from './plato.controller';

describe('Plato Controller', () => {
  let controller: PlatoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatoController],
    }).compile();

    controller = module.get<PlatoController>(PlatoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
