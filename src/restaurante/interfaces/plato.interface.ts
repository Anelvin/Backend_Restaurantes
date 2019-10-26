import { Document } from 'mongoose';

export interface Plato extends Document{
    readonly nombre:string;
}