import { Schema } from 'mongoose';

export const ProveedorSchema = new Schema({
    nombre:{
        type:String,
        required:true
    },
    telefono:{
        type:Number
    },
    direccion:String
})