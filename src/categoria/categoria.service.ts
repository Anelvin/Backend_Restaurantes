import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './interfaces/categoria.interface';
import { Model } from 'mongoose';
import { CreateCategoriaDTO } from './dto/categoria.dto';

@Injectable()
export class CategoriaService {

    constructor(@InjectModel('Categoria') private readonly categoriaModel:Model<Categoria>){}

    async createCategoria(createCategoria:CreateCategoriaDTO):Promise<Categoria>{
        try {
            const categoria = new this.categoriaModel(createCategoria);
            await categoria.save();
            return categoria;
        } catch (error) {
            return error;
        }
    }
    async getCategorias():Promise<Categoria[]>{
        try {
            const categorias = await this.categoriaModel.find();
            return categorias;
        } catch (error) {
            return error;
        }
    }
    async getCategoria(categoriaID: string):Promise<Categoria>{
        try {
            const categoria = await this.categoriaModel.findById(categoriaID);
            return categoria;
        } catch (error) {
            return error;
        }
    }
    async deleteCategoria(categoriaID: string):Promise<Categoria>{
        try {
            const categoria = await this.categoriaModel.findByIdAndDelete(categoriaID);
            return categoria;
        } catch (error) {
            return error;
        }
    }
    async updateCategoria(categoriaID: string, createCategoriaDTO:CreateCategoriaDTO):Promise<Categoria>{
        try {
            const categoria = await this.categoriaModel.findByIdAndUpdate(categoriaID, createCategoriaDTO, { new:true });
            return categoria;
        } catch (error) {
            return error;
        }
    }

}
