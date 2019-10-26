import { Module } from '@nestjs/common';
import { RestauranteController } from './restaurante.controller';
import { RestauranteService } from './restaurante.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RestauranteSchema } from './schema/restaurante.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'Restaurante',schema: RestauranteSchema}
    ]),
  ],
  controllers: [RestauranteController],
  providers: [RestauranteService]
})
export class RestauranteModule {}
