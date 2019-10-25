import { Injectable } from '@nestjs/common';
import { CreateProveedorDTO } from './dto/proveedor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proveedor } from './interfaces/proveedor.interface';


@Injectable()
export class ProveedorService {

    constructor(@InjectModel('Proveedor') private readonly proveedorModel:Model<Proveedor>){}

    async createProveedor(createProveedorDTO:CreateProveedorDTO):Promise<Proveedor>{
        try {
            const proveedor = new this.proveedorModel(createProveedorDTO);
            await proveedor.save();
            return proveedor;
        } catch (error) {
            return error;
        }
    }
    async getProveedores():Promise<Proveedor[]>{
        try {
            const proveedores = await this.proveedorModel.find();
            return proveedores;
        } catch (error) {
            return error;
        }
    }
    async getProveedor(proveedorID:string):Promise<Proveedor>{
        try {
            const proveedor = await this.proveedorModel.findById(proveedorID);
            return proveedor;
        } catch (error) {
            return error;
        }
    }
    async deleteProveedor(proveedorID:string):Promise<Proveedor>{
        try {
            const proveedor = await this.proveedorModel.findByIdAndDelete(proveedorID);
            return proveedor;
        } catch (error) {
            return error;
        }
    }
    async updateProveedor(proveedorID:string, createProveedorDTO:CreateProveedorDTO):Promise<Proveedor>{
        try {
            const proveedor = await this.proveedorModel.findByIdAndUpdate(proveedorID, createProveedorDTO, { new:true });
            return proveedor;
        } catch (error) {
            return error;
        }
    }

}
