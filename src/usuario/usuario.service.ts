import { Injectable } from '@nestjs/common';
import { Usuario } from './interfaces/usuario.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsuarioDTO } from './dto/usuario.dto';
import { createServer } from 'tls';


@Injectable()
export class UsuarioService {

    private saltRounds = 10;

    constructor(@InjectModel('Usuario') private usuarioModel:Model<Usuario>){}

    async createUsuario(createUsuarioDTO:CreateUsuarioDTO):Promise<Usuario>{
        try {
            let usuario = new this.usuarioModel(createUsuarioDTO);
            await usuario.save();
            return usuario;
        } catch (error) {
            return error;
        }
    }
    async getUsuarioByName(nombre:string):Promise<Usuario>{
        try {
            const usuario = await this.usuarioModel.findOne({nombre:nombre});
            if(usuario){
                return usuario;
            }else{
                return null;
            }
        } catch (error) {
            return error;
        }
    }
    async getToken(token:string):Promise<Usuario | null>{
        try {
            const usuario = await this.usuarioModel.findOne({token})
            if(!usuario){
                return null;
            }else{
                return usuario;
            }
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

    async findOne(username:string):Promise<Usuario | undefined>{
        return await this.usuarioModel.findOne(user => user.nombre === username);
    }
}
