import { Injectable } from '@nestjs/common';
import { Plato } from './interfaces/plato.interface';
import { CreatePlatoDTO } from './dto/plato.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIngredienteDTO } from './dto/ingrediente.dto';

@Injectable()
export class PlatoService {

    constructor(@InjectModel('Plato') private platoModel:Model<Plato>){}

    async createPlato(createPlatoDTO:CreatePlatoDTO):Promise<Plato>{
        try {
            const plato = new this.platoModel(createPlatoDTO);
            await plato.save();
            return plato;
        } catch (error) {
            return error;
        }
    }

    async getPlatos():Promise<Plato[]>{
        try {
            const platos = await this.platoModel.find();
            return platos;
        } catch (error) {
            return error;
        }
    }

    async getPlato(platoID: string):Promise<Plato>{
        try {
            const plato = await this.platoModel.findById(platoID);
            return plato;
        } catch (error) {
            return error;
        }
    }

    async deletePlato(platoID: string):Promise<Plato>{
        try {
            const plato = await this.platoModel.findByIdAndDelete(platoID);
            return plato;
        } catch (error) {
            return error;
        }
    }

    async updatePlato(platoID: string, createPlatoDTO:CreatePlatoDTO):Promise<Plato>{
        try {
            const plato = await this.platoModel.findByIdAndUpdate(platoID,createPlatoDTO,{new:true});
            return plato;
        } catch (error) {
            return error;
        }
    }

    async addIngredientes(platoID: string, createIngredienteDTO:CreateIngredienteDTO):Promise<Plato>{
        try {
            const plato = await this.platoModel.findOneAndUpdate({_id:platoID},{$push:{ingredientes:createIngredienteDTO}},{new:true});
            return plato;
        } catch (error) {
            return error;
        }
    }

}
