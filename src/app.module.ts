import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoModule } from './producto/producto.module';
import {MongooseModule} from '@nestjs/mongoose'

@Module({
  imports: [
    ProductoModule, 
    MongooseModule.forRoot('mongodb+srv://Anelvin:Maria.21@cluster0-otafm.mongodb.net/restaurantes?retryWrites=true&w=majority',
    {useNewUrlParser:true, useUnifiedTopology:true})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
