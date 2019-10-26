import { Document } from 'mongoose';

export interface Pedido extends Document{
    readonly producto:string;
    readonly cantidad:number;
    readonly restaurante:string;
}