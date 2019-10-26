import { Document } from 'mongoose';

export interface UsuarioRestaurante extends Document{
    nombre:string;
    password:string;
    cargo:string;
    restaurante:string;
}