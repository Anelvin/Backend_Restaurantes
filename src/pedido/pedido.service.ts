import { Injectable } from '@nestjs/common';
import { CreatePedidoDTO } from './dto/pedido.dto';
import { Pedido } from './interfaces/pedido.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PedidoService {

    constructor(@InjectModel('Pedido') private readonly pedioModel:Model<Pedido>){}

    async getPedidos():Promise<Pedido[]>{
        try {
            const pedidos = await this.pedioModel.find();
            return pedidos;
        } catch (error) {
            return error;
        }
    }

    async getPedido(pedidoID:string):Promise<Pedido>{
        try {
            const pedido = await this.pedioModel.findById(pedidoID);
            return pedido;
        } catch (error) {
            return error;
        }
    }

    async createPedido(createPedidoDTO:CreatePedidoDTO):Promise<Pedido>{
        try {
            const pedido = new this.pedioModel(createPedidoDTO);
            return await pedido.save();
        } catch (error) {
            return error;   
        }
    }

    async deletePedido(pedidoID:string):Promise<Pedido>{
        try {
            const pedido = await this.pedioModel.findByIdAndDelete(pedidoID);
            return pedido;
        } catch (error) {
            return error;
        }
    }

    async updatePedido(pedidoID:string, createPedidoDTO:CreatePedidoDTO):Promise<Pedido>{
        try {
            const pedido = await this.pedioModel.findByIdAndUpdate(pedidoID, createPedidoDTO, { new:true });
            return pedido;
        } catch (error) {
            return error;
        }
    }

}
