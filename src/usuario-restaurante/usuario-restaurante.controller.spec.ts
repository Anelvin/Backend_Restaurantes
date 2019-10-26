import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioRestauranteController } from './usuario-restaurante.controller';

describe('UsuarioRestaurante Controller', () => {
  let controller: UsuarioRestauranteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioRestauranteController],
    }).compile();

    controller = module.get<UsuarioRestauranteController>(UsuarioRestauranteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
