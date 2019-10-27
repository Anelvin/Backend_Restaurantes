import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuarioRestaurante } from './interfaces/usuario-restaurante.interface';
import { CreateUsuarioRestauranteDTO } from './dto/usuario-restaurante.dto';

@Injectable()
export class UsuarioRestauranteService {

    constructor(@InjectModel('UsuarioRestaurante') private usuarioRestauranteModel:Model<UsuarioRestaurante>){}

    async createUsuarioRestaurante(createUsuarioRestauranteDTO:CreateUsuarioRestauranteDTO):Promise<UsuarioRestaurante>{
        try {
            let usuarioRestaurante = new this.usuarioRestauranteModel(createUsuarioRestauranteDTO);
            await usuarioRestaurante.save();
            return usuarioRestaurante;
        } catch (error) {
            return error;
        }
    }    
    async getUsuariosRestaurantes():Promise<UsuarioRestaurante[]>{
        try {
            const usuariosRestaurante = await this.usuarioRestauranteModel.find();
            return usuariosRestaurante;
        } catch (error) {
            return error;
        }
    }
    async getUsuarioByName(nombre:string):Promise<UsuarioRestaurante>{
        try {
            const usuario = await this.usuarioRestauranteModel.findOne({nombre:nombre});
            if(usuario){
                return usuario;
            }else{
                return null;
            }
        } catch (error) {
            return error;
        }
    }
    async getUsuarioRestaurante(usuarioRestauranteID:string):Promise<UsuarioRestaurante>{
        try {
            const usuarioRestaurante = await this.usuarioRestauranteModel.findById(usuarioRestauranteID);
            return usuarioRestaurante;
        } catch (error) {
            return error;
        }
    }
    async deleteUsuarioRestaurante(usuarioRestauranteID:string):Promise<UsuarioRestaurante>{
        try {
            const usuarioRestaurante = await this.usuarioRestauranteModel.findByIdAndDelete(usuarioRestauranteID);
            return usuarioRestaurante;
        } catch (error) {
            return error;
        }
    }
    async updateUsuarioRestaurante(usuarioRestauranteID:string, createUsuarioRestaurante:CreateUsuarioRestauranteDTO):Promise<UsuarioRestaurante>{
        try {
            const usuarioRestaurante = await this.usuarioRestauranteModel.findByIdAndUpdate(usuarioRestauranteID, createUsuarioRestaurante, { new:true });
            return usuarioRestaurante;
        } catch (error) {
            return error;
        }
    }
    async getToken(token:string,restaurante:string):Promise<UsuarioRestaurante | null>{
        try {
            const usuario = await this.usuarioRestauranteModel.findOne({$and:[{token:token},{restaurante:restaurante}]});
            if(!usuario){
                return null;
            }else{
                return usuario;
            }
        } catch (error) {
            return error;
        }
    }
    async getTokenSolo(token:string):Promise<UsuarioRestaurante | null>{
        try {
            const usuario = await this.usuarioRestauranteModel.findOne({token});
            if(!usuario){
                return null;
            }else{
                return usuario;
            }
        } catch (error) {
            return error;
        }
    }
}
