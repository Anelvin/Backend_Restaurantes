import { Controller, Get, Post, Put, Delete, HttpStatus, Body, Res, Req, Param } from '@nestjs/common';
import { PlatoService } from './plato.service';
import { CreatePlatoDTO } from './dto/plato.dto';
import { Plato } from './interfaces/plato.interface';
import { CreateIngredienteDTO } from './dto/ingrediente.dto';
import { UsuarioRestauranteService } from '../usuario-restaurante/usuario-restaurante.service';
import { IngredienteSchema } from 'src/ingrediente/schema/ingrediente.schema';
import { ClientHttp2Session } from 'http2';

@Controller('plato')
export class PlatoController {

    constructor(
        private platoService:PlatoService,
        private usuarioRestauranteService:UsuarioRestauranteService){}

    @Post('/create')
    async createPlato(@Req() req, @Res() res, @Body() createPlatoDTO: CreatePlatoDTO):Promise<Plato>{
        try {
            const cabecera = req.body.token;
            const usuario = await this.usuarioRestauranteService.getToken(cabecera,req.body.restaurante);
            if(cabecera === usuario.token && req.body.restaurante === usuario.restaurante){
                const plato = await this.platoService.createPlato(createPlatoDTO);
                return res.status(HttpStatus.OK).json(plato);
            }else{
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Producto no creado</h1>');                            
            }
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);
        }
    }

    @Post()
    async getPlatos(@Req() req, @Res() res):Promise<Plato[]>{
        try {
            console.log(req.body);
            const platos = await this.platoService.getPlatos(req.body.restaurante);
            return res.status(HttpStatus.OK).json(platos);    
        } catch (error) {
            return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.NOT_FOUND);
        }
    }

    @Post('/:platoID')
    async getPlato(@Req() req, @Res() res, @Param('platoID') platoID:string):Promise<Plato>{
        try {
            const cabecera = req.body.token;
            const usuario = await this.usuarioRestauranteService.getToken(cabecera,req.body.restaurante);
            if(cabecera === usuario.token && req.body.restaurante === usuario.restaurante){
                const plato = await this.platoService.getPlato(platoID);
                return res.status(HttpStatus.OK).json(plato);     
            }else{
                return res.status(HttpStatus.UNAUTHORIZED).send('<h1>No se han encontrado platos</h1>');                            
            }                 
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);            
        }
    }

    @Delete('/delete/:platoID')
    async deletePlato(@Req() req, @Res() res, @Param('platoID') platoID:string):Promise<Plato>{
        try {
            const cabecera = req.headers['autorization'];
            const usuario = await this.usuarioRestauranteService.getToken(cabecera,req.body.restaurante);
            if(cabecera === usuario.token && req.body.restaurante === usuario.token){
                const plato = await this.platoService.deletePlato(platoID);
                return res.status(HttpStatus.OK).json(plato);      
            }else{
                return res.status(HttpStatus.UNAUTHORIZED).send('<h1>No se han encontrado platos</h1>');                            
            }                            
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                        
        }
    }

    @Put('/update/:platoID')
    async updatePlato(@Req() req, @Res() res, @Param('platoID') platoID:string, @Body() createPlatoDTO:CreatePlatoDTO):Promise<Plato>{
        try {
            const cabecera = req.headers['autorization'];
            const usuario = await this.usuarioRestauranteService.getToken(cabecera,req.body.restaurante);
            if(cabecera === usuario.token && req.body.restaurante === usuario.token){
                const plato = await this.platoService.updatePlato(platoID, createPlatoDTO);
                return res.status(HttpStatus.OK).json(plato);    
            }else{
                return res.status(HttpStatus.UNAUTHORIZED).send('<h1>No se han encontrado platos</h1>');                            
            }                                    
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                                    
        }
    }

    @Post('/:platoID/ingrediente')
    async addIngrediente(@Req() req, @Res() res,@Param('platoID') platoID:string):Promise<Plato>{
        const {ingrediente, ...result} = req.body;
        try {
            const cabecera = req.body.token
            const usuario = await this.usuarioRestauranteService.getToken(cabecera, req.body.restaurante);
            if(cabecera === usuario.token && req.body.restaurante === usuario.restaurante){
                const plato = await this.platoService.addIngredientes(platoID, ingrediente);
                return res.status(HttpStatus.OK).json(plato);      
            }else{
                return res.status(HttpStatus.UNAUTHORIZED).send('<h1>No se han encontrado platos</h1>');                            
            }                                     
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                                                
        }
    }
}
