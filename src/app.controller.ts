import { Controller, Get, Request, Response, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioRestauranteService } from './usuario-restaurante/usuario-restaurante.service';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService,
    private readonly usuarioRestauranteService: UsuarioRestauranteService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  async login(@Request() req, @Response() res){
    try {
      console.log(req.body.nombre);
      console.log(req.body.restaurante);
      const usuario = await this.usuarioRestauranteService.getUsuarioByNameRestaurante(req.body.nombre, req.body.restaurante);
      console.log(usuario);
      const result = bcrypt.compareSync(req.body.password,usuario.password);
     if(result){
       let token = await this.appService.login(usuario);
       usuario.token=token.access_token;
       await this.usuarioRestauranteService.updateUsuario(usuario._id,usuario);
       return res.status(HttpStatus.OK).json(token);
     }else{
       return res.status(HttpStatus.UNAUTHORIZED).json(HttpStatus.UNAUTHORIZED);
     }
    } catch (error) {
      console.log(error);
    }
  }

  @Post('/restaurante/login')
  async restauranteLogin(@Request() req, @Response() res){
    console.log(req.body);
    try {
      const usuario = await this.usuarioRestauranteService.getUsuarioByName(req.body.usuario);
      if(usuario && req.body.restaurante === usuario.restaurante){
        const result = bcrypt.compareSync(req.body.password, usuario.password);
        if(result){
          let token = await this.appService.login(usuario);
          usuario.token = token.access_token;
          await this.usuarioRestauranteService.updateUsuarioRestaurante(usuario._id, usuario);
          return res.status(HttpStatus.OK).json(token);        
        }else{
         return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
        }
      }else{
        return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND)
      }
    } catch (error) {
      return error;
    }
  }
}
