import { Module } from '@nestjs/common';
import { IngredienteController } from './ingrediente.controller';
import { IngredienteService } from './ingrediente.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredienteSchema } from './schema/ingrediente.schema';
import { UsuarioRestauranteModule } from '../usuario-restaurante/usuario-restaurante.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'Ingrediente',schema:IngredienteSchema}
    ]), UsuarioRestauranteModule
  ],
  controllers: [IngredienteController],
  providers: [IngredienteService]
})
export class IngredienteModule {}
