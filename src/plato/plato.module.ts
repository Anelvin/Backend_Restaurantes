import { Module } from '@nestjs/common';
import { PlatoController } from './plato.controller';
import { PlatoService } from './plato.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatoSchema } from './schema/plato.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'Plato',schema:PlatoSchema}
    ]),
  ],
  controllers: [PlatoController],
  providers: [PlatoService]
})
export class PlatoModule {}
