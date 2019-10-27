import { Controller, Post, Res, Body, HttpStatus, Get, Param, Delete, Put, Req } from '@nestjs/common';
import { IngredienteService } from './ingrediente.service';
import { CreateIngredienteDTO } from './dto/ingrediente.dto';
import { Ingrediente } from './interfaces/ingrendiente.interface';
import { UsuarioRestauranteService } from '../usuario-restaurante/usuario-restaurante.service';

@Controller('ingrediente')
export class IngredienteController {

    constructor(
        private ingredienteService:IngredienteService,
        private usuarioRestauranteService:UsuarioRestauranteService){}

    @Post('/create')
    async createIngrediente(@Res() res, @Body() createIngredienteDTO:CreateIngredienteDTO):Promise<Ingrediente>{
        try {
            const ingrediente = await this.ingredienteService.createIngrediente(createIngredienteDTO);
            return res.status(HttpStatus.OK).json(ingrediente);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);
        }
    }

    @Get()
    async getIngredientes(@Req() req, @Res() res):Promise<Ingrediente[]>{
        try {
            const cabecera = req.headers['autorization'];    
            const usuario = await this.usuarioRestauranteService.getTokenSolo(cabecera);
            if(cabecera === usuario.token){
                const ingredientes = await this.ingredienteService.getIngredientes();
                return res.status(HttpStatus.OK).json(ingredientes);            
            } else{
                return res.status(HttpStatus.UNAUTHORIZED).send('<h1>No se han encontrado ningún ingrediente</h1>');                            
            }
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);            
        }
    }

    @Get('/:ingredienteID')
    async getIngrediente(@Req() req, @Res() res,@Param('ingredienteID') ingredienteID:string):Promise<Ingrediente>{
        try {
            const cabecera = req.headers['autorization'];    
            const usuario = await this.usuarioRestauranteService.getTokenSolo(cabecera);
            if(cabecera === usuario.token){
                const ingrediente = await this.ingredienteService.getIngrediente(ingredienteID);
                return res.status(HttpStatus.OK).json(ingrediente);        
            } else{
                return res.status(HttpStatus.UNAUTHORIZED).send('<h1>No se ha encontrado ningún ingrediente</h1>');                            
            }        
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);            
        }
    }

    @Delete('/delete/:ingredienteID')
    async deleteIngrediente(@Req() req, @Res() res, @Param('ingredienteID') ingredienteID: string):Promise<Ingrediente>{
        try {
            const cabecera = req.headers['autorization'];    
            const usuario = await this.usuarioRestauranteService.getTokenSolo(cabecera);
            if(cabecera === usuario.token){
                const ingrediente = await this.ingredienteService.deleteIngrediente(ingredienteID);
                return res.status(HttpStatus.OK).json(ingrediente);   
            } else{
                return res.status(HttpStatus.UNAUTHORIZED).send('<h1>Ha ocurrido un problema al intentar eliminar ingrediente</h1>');                            
            }           
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                                    
        }
    }

    @Put('/update/:ingredienteID')
    async updateIngrediente(@Req() req, @Res() res, @Param('ingredienteID') ingredienteID: string, @Body() createIngredienteDTO:CreateIngredienteDTO):Promise<Ingrediente>{
        try {
            const cabecera = req.headers['autorization'];    
            const usuario = await this.usuarioRestauranteService.getTokenSolo(cabecera);
            if(cabecera === usuario.token){
                const ingrediente = await this.ingredienteService.updateIngrediente(ingredienteID, createIngredienteDTO);
                return res.status(HttpStatus.OK).json(ingrediente);   
            } else{
                return res.status(HttpStatus.UNAUTHORIZED).send('<h1>Ha ocurrido un problema al intentar actualizar ingrediente</h1>');                            
            }                
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                                                
        }
    }
}
