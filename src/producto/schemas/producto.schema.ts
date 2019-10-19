import {Schema} from 'mongoose';

export const ProductoSchema = new Schema({
    nombre:{
        type:String,
        required:true
    },
    descripcion:String,
    categoria:String,
    stock:Number,
    imagenURL:String,
    proveedor:String
});