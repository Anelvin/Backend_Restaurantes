import { Module } from '@nestjs/common';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductoSchema } from './schemas/producto.schema';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'Producto', schema:ProductoSchema}
    ]), UsuarioModule
  ],
  controllers: [ProductoController],
  providers: [ProductoService]
})
export class ProductoModule {}
