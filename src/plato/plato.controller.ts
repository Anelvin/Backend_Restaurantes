import { Controller, Get, Post, Put, Delete, HttpStatus, Body, Res, Req, Param } from '@nestjs/common';
import { PlatoService } from './plato.service';
import { CreatePlatoDTO } from './dto/plato.dto';
import { Plato } from './interfaces/plato.interface';
import { CreateIngredienteDTO } from './dto/ingrediente.dto';

@Controller('plato')
export class PlatoController {

    constructor(private platoService:PlatoService){}

    @Post('/create')
    async createPlato(@Res() res, @Body() createPlatoDTO: CreatePlatoDTO):Promise<Plato>{
        try {
            const plato = await this.platoService.createPlato(createPlatoDTO);
            return res.status(HttpStatus.OK).json(plato);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);
        }
    }

    @Get()
    async getPlatos(@Res() res):Promise<Plato[]>{
        try {
            const platos = await this.platoService.getPlatos();
            return res.status(HttpStatus.OK).json(platos);         
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);
        }
    }

    @Get('/:platoID')
    async getPlato(@Res() res, @Param('platoID') platoID:string):Promise<Plato>{
        try {
            const plato = await this.platoService.getPlato(platoID);
            return res.status(HttpStatus.OK).json(plato);                     
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);            
        }
    }

    @Delete('/delete/:platoID')
    async deletePlato(@Res() res, @Param('platoID') platoID:string):Promise<Plato>{
        try {
            const plato = await this.platoService.deletePlato(platoID);
            return res.status(HttpStatus.OK).json(plato);                                 
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                        
        }
    }

    @Put('/update/:platoID')
    async updatePlato(@Res() res, @Param('platoID') platoID:string, @Body() createPlatoDTO:CreatePlatoDTO):Promise<Plato>{
        try {
            const plato = await this.platoService.updatePlato(platoID, createPlatoDTO);
            return res.status(HttpStatus.OK).json(plato);                                     
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                                    
        }
    }

    @Post('/:platoID/ingrediente')
    async addIngrediente(@Res() res,@Param('platoID') platoID:string, @Body() createIngredienteDTO:CreateIngredienteDTO):Promise<Plato>{
        try {
            const plato = await this.platoService.addIngredientes(platoID,createIngredienteDTO);
            return res.status(HttpStatus.OK).json(plato);                                     
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                                                
        }
    }
}
