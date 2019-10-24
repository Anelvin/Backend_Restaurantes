import { Controller, Get, Request, Response, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UsuarioService } from './usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {

  private saltRounds = 10;
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  async login(@Request() req, @Response() res){
    try {
      console.log(req.body);
      const usuario = await this.usuarioService.getUsuarioByName(req.body.usuario);
      const result = bcrypt.compareSync(req.body.password,usuario.password);
     if(result){
       let token = await this.appService.login(usuario);
       res.status(HttpStatus.OK).json(token);
     }else{
       res.status(HttpStatus.UNAUTHORIZED).json(HttpStatus.UNAUTHORIZED);
     }
    } catch (error) {
      console.log(error);
    }
  }
 
}
