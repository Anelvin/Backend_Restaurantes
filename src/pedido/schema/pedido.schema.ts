import { Schema } from 'mongoose';

export const PedidoSchema = new Schema({
    producto:String,
    cantidad:Number,
    restaurante:String
})