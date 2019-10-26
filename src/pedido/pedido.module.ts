import { Module } from '@nestjs/common';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PedidoSchema } from './schema/pedido.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'Pedido',schema:PedidoSchema}
    ])
  ],
  controllers: [PedidoController],
  providers: [PedidoService]
})
export class PedidoModule {}
