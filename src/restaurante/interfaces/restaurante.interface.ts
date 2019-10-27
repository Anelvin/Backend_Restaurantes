import { Document } from 'mongoose';

export interface Restaurante extends Document{
    readonly nombre:string;
    readonly descripcion:string;
    readonly mesas:[];
    readonly despensa:[];
}