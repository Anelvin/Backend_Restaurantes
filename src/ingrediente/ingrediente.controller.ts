import { Controller, Post, Res, Body, HttpStatus, Get, Param, Delete, Put } from '@nestjs/common';
import { IngredienteService } from './ingrediente.service';
import { CreateIngredienteDTO } from './dto/ingrediente.dto';
import { Ingrediente } from './interfaces/ingrendiente.interface';

@Controller('ingrediente')
export class IngredienteController {

    constructor(private ingredienteService:IngredienteService){}

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
    async getIngredientes(@Res() res):Promise<Ingrediente[]>{
        try {
            const ingredientes = await this.ingredienteService.getIngredientes();
            return res.status(HttpStatus.OK).json(ingredientes);            
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);            
        }
    }

    @Get('/:ingredienteID')
    async getIngrediente(@Res() res,@Param('ingredienteID') ingredienteID:string):Promise<Ingrediente>{
        try {
            const ingrediente = await this.ingredienteService.getIngrediente(ingredienteID);
            return res.status(HttpStatus.OK).json(ingrediente);            
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);            
        }
    }

    @Delete('/delete/:ingredienteID')
    async deleteIngrediente(@Res() res, @Param('ingredienteID') ingredienteID: string):Promise<Ingrediente>{
        try {
            const ingrediente = await this.ingredienteService.deleteIngrediente(ingredienteID);
            return res.status(HttpStatus.OK).json(ingrediente);            
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                                    
        }
    }

    @Put('/update/:ingredienteID')
    async updateIngrediente(@Res() res, @Param('ingredienteID') ingredienteID: string, @Body() createIngredienteDTO:CreateIngredienteDTO):Promise<Ingrediente>{
        try {
            const ingrediente = await this.ingredienteService.updateIngrediente(ingredienteID, createIngredienteDTO);
            return res.status(HttpStatus.OK).json(ingrediente);            
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);                                                
        }
    }
}
