import { Schema } from 'mongoose';

export const RestauranteSchema = new Schema({
    nombre:String,
    direccion:String,
    mesas:[
        {
            nombre:String,
            reservada:{
                type:Boolean,
                default:false
            }
        }
    ],
    despensa:[
        {
            producto:String,
            cantidad:Number
        }
    ]
})