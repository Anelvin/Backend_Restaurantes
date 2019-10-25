import { Controller, Get, Post, Delete, Put, Param, Body, Res, HttpStatus,Req } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDTO } from './dto/categoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { UsuarioService } from '../usuario/usuario.service';



@Controller('categoria')
export class CategoriaController {

    constructor(
        private categoriaService:CategoriaService,
        private usuarioService:UsuarioService
        ){}

    @Post('/create')
    async createCategoria(@Req() req, @Res() res, @Body() createCategoriaDTO:CreateCategoriaDTO):Promise<Categoria>{
        try {
            const cabecera = req.headers['autorization'];
            const usuario = await this.usuarioService.getToken(cabecera);
            if(cabecera === usuario.token){
                const categoria = await this.categoriaService.createCategoria(createCategoriaDTO);
                return res.status(HttpStatus.OK).json(categoria);
            }else{
                return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
        }
    }
    @Get()
    async getCategorias(@Req() req, @Res() res){
        try {
            const cabecera = req.headers['autorization'];
            const usuario = await this.usuarioService.getToken(cabecera);
            if(cabecera === usuario.token){
                const categorias = await this.categoriaService.getCategorias();
                return res.status(HttpStatus.OK).json(categorias)
            }else{
                return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
        }
    }
    @Get('/:categoriaID')
    async getCategoria(@Req() req, @Res() res, @Param('categoriaID') categoriaID: string): Promise<Categoria>{
        try {
            const cabecera = req.headers['autorization'];
            const usuario = await this.usuarioService.getToken(cabecera);
            if(cabecera === usuario.token){
                const categoria = await this.categoriaService.getCategoria(categoriaID);
                return res.status(HttpStatus.OK).json(categoria)
            }
            else{
                return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);                     
        }
    }
    @Delete('/delete/:categoriaID')
    async deleteCategoria(@Req() req, @Res() res, @Param('categoriaID') categoriaID: string):Promise<Categoria>{
        try {
            const cabecera = req.headers['autorization'];
            const usuario = await this.usuarioService.getToken(cabecera);
            if(cabecera === usuario.token){
                const categoria = await this.categoriaService.deleteCategoria(categoriaID);
                return res.status(HttpStatus.OK).json(categoria)
            }
            else{
                return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>Ha habio problemas al intentar eliminar la categoria</p>');                        
        }
    }
    @Put('/update/:categoriaID')
    async updateCategoria(@Req() req, @Res() res,@Param('categoriaID') categoriaID: string, @Body() createCategoriaDTO:CreateCategoriaDTO):Promise<Categoria>{
        try {
            const cabecera = req.headers['autorization'];
            const usuario = await this.usuarioService.getToken(cabecera);
            if(cabecera === usuario.token){
                const categoria = await this.categoriaService.updateCategoria(categoriaID, createCategoriaDTO);
                return res.status(HttpStatus.OK).json(categoria);    
            }
            else{
                return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
            }        
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>Ha habio problemas al intentar actualizar la categoria</p>');                           
        }
    }


}
