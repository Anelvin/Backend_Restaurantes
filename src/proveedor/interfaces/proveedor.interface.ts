import { Document } from 'mongoose';

export interface Proveedor extends Document{
    readonly nombre:string,
    readonly telefono:number;
    readonly direccion:string
}