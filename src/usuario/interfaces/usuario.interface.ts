import { Document } from 'mongoose';

export interface Usuario extends Document{
    nombre:string;
    password:string;
    cargo:string;
}