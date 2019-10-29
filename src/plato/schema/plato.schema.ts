import { Schema } from 'mongoose';

export const PlatoSchema = new Schema({
    nombre:{
        type:String,
        required:true
    },
    restaurante:{
        type:String,
        required:true
    },
    imagenURL:String,
    ingredientes:[]
})