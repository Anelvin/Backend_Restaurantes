import { Document } from 'mongoose';

export interface Producto extends Document{
    readonly nombre:string;
    readonly descripcion:string;
    readonly categoria:string;
    readonly stock:number;
    readonly imagenURL:string;
    readonly proveedor:string
}