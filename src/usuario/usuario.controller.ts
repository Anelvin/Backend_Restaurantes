import { Controller,Get, Post, Put, Delete, Res, Body, HttpStatus, Param, Req } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDTO } from './dto/usuario.dto';
import { Usuario } from './interfaces/usuario.interface';
import * as bcrypt from 'bcrypt';


@Controller('usuario')
export class UsuarioController {

    constructor(private usuarioService:UsuarioService){}

    private saltRounds = 10;

    async getHash(password:string | undefined):Promise<string>{
        return bcrypt.hash(password, this.saltRounds);
    }

    @Post('/create')
    async createUsuario(@Req() req, @Res() res, @Body() createUsuarioDTO:CreateUsuarioDTO):Promise<CreateUsuarioDTO>{
        const passwordHash = await this.getHash(createUsuarioDTO.password);
        try {
           const cabecera = req.headers['autorization'];
           const usuarioToken = await this.usuarioService.getToken(cabecera);
           if (cabecera === usuarioToken.token){
               createUsuarioDTO.password=passwordHash;
               const usuario = await this.usuarioService.createUsuario(createUsuarioDTO);
               return res.status(HttpStatus.OK).json(usuario);
           }else{
               return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
           }
        } catch (error) {
           return res.status(HttpStatus.NO_CONTENT).send('<h1>Error</h1><p>Ha ocurrido un problema al crear el usuario</p>');
        }
    };
    @Get()
    async getUsuarios(@Req() req, @Res() res,):Promise<Usuario>{
        try {
           const cabecera = req.headers['autorization'];
           const usuarioToken = await this.usuarioService.getToken(cabecera);
           if (cabecera === usuarioToken.token){
                const usuarios = await this.usuarioService.getUsuarios();
                return res.status(HttpStatus.OK).json(usuarios);
           }else{
               return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
           }
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>No se han encontrado ningún usuario</p>');
        }
    }
    @Get('/:usuarioID')
    async getUsuario(@Req() req, @Res() res,@Param('usuarioID') usuarioID: string):Promise<Usuario>{
        try {
            const cabecera = req.headers['autorization'];
            const usuarioToken = await this.usuarioService.getToken(cabecera);
            if (cabecera === usuarioToken.token){
                const usuario = await this.usuarioService.getUsuario(usuarioID);
                return res.status(HttpStatus.OK).json(usuario);
            }else{
                return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>No se han encontrado ningún usuario</p>');
        }
    }
    @Delete('/delete/:usuarioID')
    async deleteUsuario(@Req() req, @Res() res,@Param('usuarioID') usuarioID: string){
        try {
            const cabecera = req.headers['autorization'];
            const usuarioToken = await this.usuarioService.getToken(cabecera);
            if (cabecera === usuarioToken.token){
                const usuario = await this.usuarioService.deleteUsuario(usuarioID);
            return res.status(HttpStatus.OK).json({
                mensaje:'Usuario eliminado',
                usuario
            })
            }else{
                return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>Ha ocurrido un problema al intentar eliminar el usuario</p>');
        }
    }
    @Put('/update/:usuarioID')
    async updateUsuario(@Req() req, @Res() res,@Param('usuarioID') usuarioID: string,@Body() createUsuarioDTO:CreateUsuarioDTO){
        try {
            const cabecera = req.headers['autorization'];
            const usuarioToken = await this.usuarioService.getToken(cabecera);
            if (cabecera === usuarioToken.token){
                const usuario = await this.usuarioService.updateUsuario(usuarioID,createUsuarioDTO);
                return res.status(HttpStatus.OK).json(usuario);
            }else{
                return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>Ha ocurrido un problema al intentar actualizar el usuario</p>')
        }
    }
}
