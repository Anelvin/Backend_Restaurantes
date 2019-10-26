import { Test, TestingModule } from '@nestjs/testing';
import { RestauranteController } from './restaurante.controller';

describe('Restaurante Controller', () => {
  let controller: RestauranteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestauranteController],
    }).compile();

    controller = module.get<RestauranteController>(RestauranteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
