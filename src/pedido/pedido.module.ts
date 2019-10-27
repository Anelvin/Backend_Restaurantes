import { Module } from '@nestjs/common';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PedidoSchema } from './schema/pedido.schema';
import { UsuarioRestauranteModule } from '../usuario-restaurante/usuario-restaurante.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'Pedido',schema:PedidoSchema}
    ]),UsuarioRestauranteModule
  ],
  controllers: [PedidoController],
  providers: [PedidoService]
})
export class PedidoModule {}
