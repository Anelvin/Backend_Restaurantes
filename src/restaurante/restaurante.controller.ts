import { Controller, Get, Post, Put, Delete, HttpStatus, Body, Param, Request, Response } from '@nestjs/common';
import { Restaurante } from './interfaces/restaurante.interface';
import { CreateRestauranteDTO } from './dto/restaurante.dto';
import { RestauranteService } from './restaurante.service';
import { CreateMesaDTO } from './dto/mesa.dto';
import { CreateDespensaDTO } from './dto/despensa.dto';

@Controller('restaurante')
export class RestauranteController {

    constructor(private restauranteService:RestauranteService){}

    @Post('/create')
    async createRestaurante(@Response() res, @Body() createRestauranteDTO:CreateRestauranteDTO):Promise<Restaurante>{
        try {
            const restaurante = await this.restauranteService.createRestaurante(createRestauranteDTO);
            return res.status(HttpStatus.OK).json(restaurante);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);
        }
    }

    @Get()
    async getRestaurantes(@Response() res): Promise<Restaurante>{
        try {
            const restaurante = await this.restauranteService.getRestaurantes();
            return res.status(HttpStatus.OK).json(restaurante);            
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);            
        }
    }

    @Get('/:restauranteNombre')
    async getRestaurante(@Response() res,@Param('restauranteNombre') restauranteNombre: string):Promise<Restaurante>{
        try {
            const restaurante = await this.restauranteService.getRestaurante(restauranteNombre);
            return res.status(HttpStatus.OK).json(restaurante);            
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                        
        }
    }

    @Delete('/delete/:restauranteID')
    async deleteRestaurante(@Response() res, @Param('restauranteID') restauranteID: string):Promise<Restaurante>{
        try {
            const restaurante = await this.restauranteService.deleleRetaurante(restauranteID);
            return res.status(HttpStatus.OK).json(restaurante);            
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                                    
        }
    }

    @Put('/update/:restauranteID')
    async updateRestaurante(@Response() res, @Param('restauranteID') restauranteID: string, @Body() createRestauranteDTO:CreateRestauranteDTO):Promise<Restaurante>{
        try {
            const restaurante = await this.restauranteService.updateRestaurante(restauranteID, createRestauranteDTO);
            return res.status(HttpStatus.OK).json(restaurante);            
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                                                
        }
    }

    @Post('/mesa')
    async addMesa(@Request() req, @Response() res){
        const {restaurante, ...resto}=req.body;
        try {
            const restauranteConsult = await this.restauranteService.addMesa(restaurante,resto);
            return res.status(HttpStatus.OK).json(restauranteConsult);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                                                                        
        }
    }
    @Post('/despensa')
    async addDespensa(@Request() req, @Response() res){
        const {restaurante, ...resto} = req.body;
       try {
            const restauranteConsult = await this.restauranteService.addDespensa(restaurante, resto);
            return res.status(HttpStatus.OK).json(restauranteConsult);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                                                                        
        }
    }
}
