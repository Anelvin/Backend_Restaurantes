import { Document } from 'mongoose';

export interface Restaurante extends Document{
    readonly nombre:string;
    readonly descripcion:string;
    readonly platos:[];
    readonly mesas:[];
    readonly despensa:[];
}