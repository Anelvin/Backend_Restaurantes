import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService:UsuarioService,
        private readonly jwtService: JwtService
        ){}

    async validateUser(username:string, pass:string):Promise<any>{
        const user = await this.usuarioService.findOne(username);
        if(user && user.password === pass){
            const {password, ...result }=user;
            return result;
        }
        return null;
    }

    async login(user:any){
        const payload = {username:user.nombre, sub: user._id};
        return {
            access_token:this.jwtService.sign(payload)
        }
    }

}
