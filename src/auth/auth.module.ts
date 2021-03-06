import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports:[
    UsuarioModule, 
    PassportModule,
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions:{expiresIn:'60s'},
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}
