import { Module } from '@nestjs/common';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductoSchema } from './schemas/producto.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'Producto', schema:ProductoSchema}
    ])
  ],
  controllers: [ProductoController],
  providers: [ProductoService]
})
export class ProductoModule {}
