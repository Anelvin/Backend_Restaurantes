import { Controller, Get, Post, Put, Delete, HttpStatus, Body, Param, Request, Response } from '@nestjs/common';
import { Restaurante } from './interfaces/restaurante.interface';
import { CreateRestauranteDTO } from './dto/restaurante.dto';
import { RestauranteService } from './restaurante.service';
import { CreatePlatoDTO } from './dto/plato.dto';
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

    @Get('/:restauranteID')
    async getRestaurante(@Response() res,@Param('restauranteID') restauranteID: string):Promise<Restaurante>{
        try {
            const restaurante = await this.restauranteService.getRestaurante(restauranteID);
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

    @Post('/:restauranteID/plato')
    async addPlato(@Response() res, @Param('restauranteID') restauranteID:string, @Body() createPlatoDTO:CreatePlatoDTO){
        try {
            const restaurante = await this.restauranteService.addPlato(restauranteID, createPlatoDTO);
            return res.status(HttpStatus.OK).json(restaurante);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                                                            
        }
    }
    @Post('/:restauranteID/mesa')
    async addMesa(@Response() res, @Param('restauranteID') restauranteID:string, @Body() createMesaDTO:CreateMesaDTO){
        try {
            const restaurante = await this.restauranteService.addMesa(restauranteID,createMesaDTO);
            return res.status(HttpStatus.OK).json(restaurante);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                                                                        
        }
    }
    @Post('/:restauranteID/despensa')
    async addDespensa(@Response() res, @Param('restauranteID') restauranteID:string, @Body() createDespensaDTO:CreateDespensaDTO){
        try {
            const restaurante = await this.restauranteService.addDespensa(restauranteID, createDespensaDTO);
            return res.status(HttpStatus.OK).json(restaurante);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                                                                        
        }
    }

}
