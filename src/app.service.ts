import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {

  constructor(private readonly jwtService:JwtService){}
  getHello(): string {
    return 'Hello World!';
  }

  async login(datos){
    const payload = {username:datos.nombre, sub: datos._id};
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}

