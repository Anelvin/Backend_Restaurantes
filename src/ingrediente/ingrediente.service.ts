import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingrediente } from './interfaces/ingrendiente.interface';
import { CreateIngredienteDTO } from './dto/ingrediente.dto';

@Injectable()
export class IngredienteService {

    constructor(@InjectModel('Ingrediente') private ingredienteModel:Model<Ingrediente>){}

    async createIngrediente(createIngredienteDTO:CreateIngredienteDTO):Promise<Ingrediente>{
        try {
            const ingrediente = new this.ingredienteModel(createIngredienteDTO);
            await ingrediente.save();
            return ingrediente;
        } catch (error) {
            return error;
        }
    }

    async getIngredientes():Promise<Ingrediente[]>{
        try {
            const ingredientes = await this.ingredienteModel.find();
            return ingredientes;
        } catch (error) {
            return error;
        }
    }

    async getIngrediente(IngredenteID:string):Promise<Ingrediente>{
        try {
            const ingrediente = await this.ingredienteModel.findById(IngredenteID);
            return ingrediente;
        } catch (error) {
            return error;
        }
    }

    async deleteIngrediente(IngredienteID:string):Promise<Ingrediente>{
        try {
            const ingrediente = await this.ingredienteModel.findByIdAndDelete(IngredienteID);
            return ingrediente;
        } catch (error) {
            return error;
        }
    }

    async updateIngrediente(IngredienteID:string,createIngredienteDTO:CreateIngredienteDTO):Promise<Ingrediente>{
        try {
            const ingrediente = await this.ingredienteModel.findByIdAndUpdate(IngredienteID,createIngredienteDTO);
            return ingrediente;
        } catch (error) {
            return error;
        }
    }
}
