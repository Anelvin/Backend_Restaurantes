import { Controller, Get, Post, Delete, Put, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDTO } from './dto/categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller('categoria')
export class CategoriaController {

    constructor(private categoriaService:CategoriaService){}

    @Post('/create')
    async createCategoria(@Res() res, @Body() createCategoriaDTO:CreateCategoriaDTO):Promise<Categoria>{
        try {
            const categoria = await this.categoriaService.createCategoria(createCategoriaDTO);
            return res.status(HttpStatus.OK).json(categoria)
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>Ha ocurrido un problema al intentar registrar la categoría</p>');
        }
    }
    @Get()
    async getCategorias(@Res() res):Promise<Categoria[]>{
        try {
            const categorias = await this.categoriaService.getCategorias();
            return res.status(HttpStatus.OK).json(categorias)
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>No se han encontrado categorías</p>');            
        }
    }
    @Get('/:categoriaID')
    async getCategoria(@Res() res, @Param('categoriaID') categoriaID: string): Promise<Categoria>{
        try {
            const categoria = await this.categoriaService.getCategoria(categoriaID);
            return res.status(HttpStatus.OK).json(categoria)
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>No se ha encontrado ninguna categoría</p>');                        
        }
    }
    @Delete('/delete/:categoriaID')
    async deleteCategoria(@Res() res, @Param('categoriaID') categoriaID: string):Promise<Categoria>{
        try {
            const categoria = await this.categoriaService.deleteCategoria(categoriaID);
            return res.status(HttpStatus.OK).json(categoria)
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>Ha habio problemas al intentar eliminar la categoria</p>');                        
        }
    }
    @Put('/update/:categoriaID')
    async updateCategoria(@Res() res,@Param('categoriaID') categoriaID: string, @Body() createCategoriaDTO:CreateCategoriaDTO):Promise<Categoria>{
        try {
            const categoria = await this.categoriaService.updateCategoria(categoriaID, createCategoriaDTO);
            return res.status(HttpStatus.OK).json(categoria);            
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>Ha habio problemas al intentar actualizar la categoria</p>');                           
        }
    }


}
