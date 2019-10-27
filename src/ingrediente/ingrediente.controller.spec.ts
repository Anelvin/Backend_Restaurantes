import { Test, TestingModule } from '@nestjs/testing';
import { IngredienteController } from './ingrediente.controller';

describe('Ingrediente Controller', () => {
  let controller: IngredienteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredienteController],
    }).compile();

    controller = module.get<IngredienteController>(IngredienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
