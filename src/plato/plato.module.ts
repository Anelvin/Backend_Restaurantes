import { Module } from '@nestjs/common';
import { PlatoController } from './plato.controller';
import { PlatoService } from './plato.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatoSchema } from './schema/plato.schema';
import { UsuarioRestauranteModule } from '../usuario-restaurante/usuario-restaurante.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'Plato',schema:PlatoSchema}
    ]),UsuarioRestauranteModule
  ],
  controllers: [PlatoController],
  providers: [PlatoService],
  exports:[PlatoService]
})
export class PlatoModule {}
