import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from './schema/categoria.schema';
import { UsuarioModule } from '../usuario/usuario.module';



@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'Categoria',schema:CategoriaSchema}
    ]),UsuarioModule
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService]
})
export class CategoriaModule {}
