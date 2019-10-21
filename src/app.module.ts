import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoModule } from './producto/producto.module';
import {MongooseModule} from '@nestjs/mongoose'
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    ProductoModule, 
    MongooseModule.forRoot('mongodb+srv://Anelvin:Maria.21@cluster0-otafm.mongodb.net/restaurantes?retryWrites=true&w=majority',
    {useNewUrlParser:true, useUnifiedTopology:true,useFindAndModify:false}), UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
