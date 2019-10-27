import { Document } from 'mongoose';

export interface Ingrediente extends Document{
    readonly nombre:string;
    readonly descripcion:string;
    readonly categoria:string
}