import { Document } from 'mongoose';

export interface Usuario extends Document{
    readonly nombre:string;
    readonly password:string;
    readonly cargo:string;
}