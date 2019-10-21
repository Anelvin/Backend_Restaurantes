import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from './schema/categoria.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'Categoria',schema:CategoriaSchema}
    ])
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService]
})
export class CategoriaModule {}
