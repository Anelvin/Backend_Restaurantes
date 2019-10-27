import { Controller, Get, Post, Put, Delete, HttpStatus, Response, Request, Body, Param } from '@nestjs/common';
import { UsuarioRestauranteService } from './usuario-restaurante.service';
import { CreateUsuarioRestauranteDTO } from './dto/usuario-restaurante.dto';
import { UsuarioRestaurante } from './interfaces/usuario-restaurante.interface';
import * as bcrypt from 'bcrypt';

@Controller('usuario-restaurante')
export class UsuarioRestauranteController {

    constructor(private usuarioRestauranteService:UsuarioRestauranteService){}

    private saltRounds = 10;

    async getHash(password: string | undefined):Promise<string>{
        return bcrypt.hash(password, this.saltRounds);
    }

    @Post('/create')
    async createUsuarioRestaurante(@Request() req, @Response() res, @Body() createUsuarioRestauranteDTO:CreateUsuarioRestauranteDTO):Promise<UsuarioRestaurante>{
        const passwordHash = await this.getHash(createUsuarioRestauranteDTO.password);
        try {
            createUsuarioRestauranteDTO.password = passwordHash;
            const usuarioRestaurante = await this.usuarioRestauranteService.createUsuarioRestaurante(createUsuarioRestauranteDTO);
            return res.status(HttpStatus.OK).json(usuarioRestaurante);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);
        }
    }

    @Get()
    async getUsuariosRestaurantes(@Request() req,@Response() res):Promise<UsuarioRestaurante[]>{
        try {
            const usuariosRestaurantes = await this.usuarioRestauranteService.getUsuariosRestaurantes();
            return res.status(HttpStatus.OK).json(usuariosRestaurantes);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);
        }
    }

    @Get('/:usuarioRestauranteID')
    async getUsusarioRestaurante(@Request() req, @Response() res,@Param('usuarioRestauranteID') usuarioRestauranteID:string):Promise<UsuarioRestaurante>{
        try {
            const usuarioRestaurante = await this.usuarioRestauranteService.getUsuarioRestaurante(usuarioRestauranteID);
            return res.status(HttpStatus.OK).json(usuarioRestaurante);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);
        }
    }

    @Delete('/delete/:usuarioRestauranteID')
    async deleteUsuarioRestaurante(@Request() req, @Response() res, @Param('usuarioRestauranteID') usuarioRestauranteID:string):Promise<UsuarioRestaurante>{
        try {
            const usuarioRestaurante = await this.usuarioRestauranteService.deleteUsuarioRestaurante(usuarioRestauranteID);
            return res.status(HttpStatus.OK).json(usuarioRestaurante);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);
        }
    }

    @Put('/update/:usuarioRestauranteID')
    async updateRestaurante(@Request() req, @Response() res, @Param('usuarioRestauranteID') usuarioRestauranteID:string, @Body() createUsuarioRestauranteDTO:CreateUsuarioRestauranteDTO):Promise<UsuarioRestaurante>{
        const passwordHash = await this.getHash(createUsuarioRestauranteDTO.password);
        try {
            createUsuarioRestauranteDTO.password = passwordHash;
            const usuarioRestaurante = await this.usuarioRestauranteService.updateUsuarioRestaurante(usuarioRestauranteID, createUsuarioRestauranteDTO);
            return res.status(HttpStatus.OK).json(usuarioRestaurante);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);            
        }
    }
}
