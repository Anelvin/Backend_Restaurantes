import { Controller, Get, Post, Put, Delete, Request, Response, Body, Param, HttpStatus, Res } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDTO } from './dto/pedido.dto';
import { Pedido } from './interfaces/pedido.interface';

@Controller('pedido')
export class PedidoController {

    constructor(
        private pedidoService:PedidoService,
        ){}

    @Post('/create')
    async createPedido(@Response() res, @Body() createPedido:CreatePedidoDTO):Promise<Pedido>{
        try {
            const pedido = await this.pedidoService.createPedido(createPedido);
            return res.status(HttpStatus.OK).json(pedido)
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);
        }

    }

    @Get()
    async getPedidos(@Response() res):Promise<Pedido[]>{
        try {
            const pedidos = await this.pedidoService.getPedidos();
            return res.status(HttpStatus.OK).json(pedidos);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);            
        }
    }

    @Get('/:pedidoID')
    async getPedido(@Response() res, @Param('pedidoID') pedidoID:string):Promise<Pedido>{
        try {
            const pedido = await this.pedidoService.getPedido(pedidoID);
            return res.status(HttpStatus.OK).json(pedido);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);
        }
    }

    @Delete('/delete/:pedidoID')
    async deletePedido(@Response() res, @Param('pedidoID') pedidoID:string){
        try {
            const pedido = await this.pedidoService.deletePedido(pedidoID);
            return res.status(HttpStatus.OK).json(pedido);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);
        }
    }

    @Put('/update/:pedidoID')
    async update(@Response() res, @Param('pedidoID') pedidoID:string, @Body() createPedidoDTO:CreatePedidoDTO){
        try {
            const pedido = await this.pedidoService.updatePedido(pedidoID, createPedidoDTO);
            return res.status(HttpStatus.OK).json(pedido);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);
        }
    }
}
