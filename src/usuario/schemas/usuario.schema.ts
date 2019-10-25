import {Schema} from 'mongoose';

export const UsuarioSchema=new Schema({
    nombre:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cargo:{
        type:String,
        required:true
    },
    token:String,
})