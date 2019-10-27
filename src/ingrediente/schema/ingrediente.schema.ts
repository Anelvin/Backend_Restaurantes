import { Schema } from 'mongoose';

export const IngredienteSchema = new Schema({
    nombre:{
        type:String,
        required:true
    },
    descripcion:String,
    categoria:String
})