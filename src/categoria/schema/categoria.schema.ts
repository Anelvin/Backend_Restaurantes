import { Schema } from 'mongoose';

export const CategoriaSchema = new Schema({
    categoria:{
        type:String,
        requiered:true
    },
    descripcion:String
})