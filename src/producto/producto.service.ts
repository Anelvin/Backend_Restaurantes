import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Producto } from './interfaces/producto.interface';
import { CreateProductoDTO } from './dto/producto.dto';

@Injectable()
export class ProductoService {

    constructor(@InjectModel('Producto') private readonly productoModel:Model<Producto>){}

    async getProductos(): Promise<Producto[]>{
        const productos = await this.productoModel.find()
        return productos;
    }

    async getProducto(productoID: string): Promise<Producto>{
        const producto = await this.productoModel.findById(productoID);
        return producto;
    }

    async createProducto(createProductoDTO:CreateProductoDTO): Promise<Producto>{
       const producto = new this.productoModel(createProductoDTO);
       return await producto.save();
    }
    async deleteProducto(productoID:string):Promise<Producto>{
        const deleteProducto = await this.productoModel.findByIdAndDelete(productoID);
        return deleteProducto;
    }
    async updateProducto(productoID:string, createProductoDTO:CreateProductoDTO):Promise<Producto>{
        const producto= await this.productoModel.findByIdAndUpdate(productoID,createProductoDTO);
        return producto;
    }

}
