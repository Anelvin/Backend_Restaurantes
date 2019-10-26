import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurante } from './interfaces/restaurante.interface';
import { CreateRestauranteDTO } from './dto/restaurante.dto';
import { CreatePlatoDTO } from './dto/plato.dto';
import { CreateMesaDTO } from './dto/mesa.dto';
import { CreateDespensaDTO } from './dto/despensa.dto';

@Injectable()
export class RestauranteService {

    constructor(@InjectModel('Restaurante') private restauranteModel:Model<Restaurante>){}

    async createRestaurante(createRestauranteDTO:CreateRestauranteDTO):Promise<Restaurante>{
        try {
            const restaurante = new this.restauranteModel(createRestauranteDTO);
            restaurante.save();
            return restaurante;
        } catch (error) {
            return error;
        }
    }

    async getRestaurantes():Promise<Restaurante[]>{
        try {
            const restaurantes = await this.restauranteModel.find();
            return restaurantes;
        } catch (error) {
            return error;
        }
    }

    async getRestaurante(restauranteID: string): Promise<Restaurante>{
        try {
            const restaurante = await this.restauranteModel.findById(restauranteID);
            return restaurante;
        } catch (error) {
            return error;
        }
    }

    async deleleRetaurante(restauranteID: string):Promise<Restaurante>{
        try {
            const restaurante = await this.restauranteModel.findByIdAndDelete(restauranteID);
            return restaurante;
        } catch (error) {
            return error;
        }
    }

    async updateRestaurante(restauranteID: string, createRestauranteDTO: CreateRestauranteDTO):Promise<Restaurante>{
        try {
            const restaurante = await this.restauranteModel.findByIdAndUpdate(restauranteID, createRestauranteDTO,{ new:true });
            return restaurante;
        } catch (error) {
            return error;
        }
    }

    async addPlato(restauranteID: string, createPlatoDTO:CreatePlatoDTO):Promise<Restaurante>{
        try {
            const restaurante = await this.restauranteModel.findOneAndUpdate({_id:restauranteID},{$push: {platos:createPlatoDTO}},{new:true});
            return restaurante;
        } catch (error) {
            return error;
        }
    }

    async addMesa(restauranteID:string, createMesaDTO:CreateMesaDTO):Promise<Restaurante>{
        try {
            const restaurante = await this.restauranteModel.findOneAndUpdate({_id:restauranteID},{$push:{mesas:createMesaDTO}},{new:true});
            return restaurante;
        } catch (error) {
            return error;
        }
    }

    async addDespensa(restauranteID:string, createDespensaDTO:CreateDespensaDTO):Promise<Restaurante>{
        try {
            const restaurante = await this.restauranteModel.findOneAndUpdate({_id:restauranteID},{$push:{despensa:createDespensaDTO}},{new:true});
            return restaurante;
        } catch (error) {
            return error;
        }
    }

}
