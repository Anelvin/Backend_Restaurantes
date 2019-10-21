import { Injectable } from '@nestjs/common';
import { Usuario } from './interfaces/usuario.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsuarioDTO } from './dto/usuario.dto';
import { createServer } from 'tls';

@Injectable()
export class UsuarioService {

    constructor(@InjectModel('Usuario') private readonly usuarioModel:Model<Usuario>){}

    async createUsuario(createUsuarioDTO:CreateUsuarioDTO):Promise<Usuario>{
        try {
            const usuario = new this.usuarioModel(createUsuarioDTO);
            await usuario.save();
            return usuario;
        } catch (error) {
            return error;
        }
    }
    async getUsuarios():Promise<Usuario[]>{
        try {
            const usuarios = await this.usuarioModel.find();
            return usuarios;
        } catch (error) {
            return error;
        }
    }
    async getUsuario(usuarioID: string):Promise<Usuario>{
        try {
            const usuario = await this.usuarioModel.findById(usuarioID);
            return usuario;
        } catch (error) {
            return error;
        }
    }
    async deleteUsuario(usuarioID: string):Promise<Usuario>{
        try {
            const usuario = await this.usuarioModel.findByIdAndDelete(usuarioID);
            return usuario;
        } catch (error) {
            return error;
        }   
    }
    async updateUsuario(usuarioID: string, createUsuarioDTO:CreateUsuarioDTO):Promise<Usuario>{
        try {
            const usuario =  await this.usuarioModel.findByIdAndUpdate(usuarioID,createUsuarioDTO,{new: true});
            return usuario;
        } catch (error) {
            return error;
        }
    }
}
