import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioRestauranteService } from './usuario-restaurante.service';

describe('UsuarioRestauranteService', () => {
  let service: UsuarioRestauranteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioRestauranteService],
    }).compile();

    service = module.get<UsuarioRestauranteService>(UsuarioRestauranteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
