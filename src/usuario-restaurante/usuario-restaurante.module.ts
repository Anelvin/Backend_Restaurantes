import { Module } from '@nestjs/common';
import { UsuarioRestauranteController } from './usuario-restaurante.controller';
import { UsuarioRestauranteService } from './usuario-restaurante.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioRestauranteSchema } from './schema/usuario-restaurante.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'UsuarioRestaurante',schema:UsuarioRestauranteSchema}
    ]),
  ],
  controllers: [UsuarioRestauranteController],
  providers: [UsuarioRestauranteService],
  exports:[UsuarioRestauranteService]
})
export class UsuarioRestauranteModule {}
