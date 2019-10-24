import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoModule } from './producto/producto.module';
import { MongooseModule } from '@nestjs/mongoose'
import { UsuarioModule } from './usuario/usuario.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constans';

@Module({
  imports: [
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions:{expiresIn:'24h'}
    }),
    ProductoModule, 
    MongooseModule.forRoot('mongodb+srv://Anelvin:Maria.21@cluster0-otafm.mongodb.net/restaurantes?retryWrites=true&w=majority',
    {useNewUrlParser:true, useUnifiedTopology:true,useFindAndModify:false}), UsuarioModule, CategoriaModule, ProveedorModule, AuthModule, UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
