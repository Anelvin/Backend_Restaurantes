import { Controller, Get, Post, Put, Delete, Res, HttpStatus,Body, Param, Req } from '@nestjs/common';
import { CreateProductoDTO } from './dto/producto.dto';
import { ProductoService } from './producto.service';
import { Producto } from './interfaces/producto.interface';
import { UsuarioService } from '../usuario/usuario.service';

@Controller('/producto')
export class ProductoController {

    constructor(
        private productoService:ProductoService,
        private usuarioService:UsuarioService){}

    @Post('/create')
    async createPost(@Res() res,@Body() createProductoDTO:CreateProductoDTO){
        const producto = await this.productoService.createProducto(createProductoDTO)
        return res.status(HttpStatus.OK).json({
            mensaje:'Producto creado!!!',
            producto:producto
        })
    }
    @Get()
    async getProductos(@Req() req,@Res() res){
        try {
            const productos = await this.productoService.getProductos();
            return res.status(HttpStatus.OK).json(productos);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(HttpStatus.NOT_FOUND);
        }
    
    }
    @Get('/:productoID')
    async getProducto(@Req() req, @Res() res,@Param('productoID') productoID){
        try {
            const cabecera = req.headers['autorization'];
            const usuario = await this.usuarioService.getToken(cabecera);
            console.log('hasta aqui');
            if (cabecera === usuario.token){
                const producto = await this.productoService.getProducto(productoID);
                return res.status(HttpStatus.OK).json(producto);
            }else{
                return  res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Producto no encontrado</h1>');
        }

    }
    @Delete('/delete/:productoID')
    async deleteProducto(@Req() req, @Res() res, @Param('productoID') productoID){
        try {
            const cabecera = req.headers['autorization'];
            const usuario = await this.usuarioService.getToken(cabecera);
            console.log('hasta aqui');
            if (cabecera === usuario.token){
                const producto = await this.productoService.deleteProducto(productoID);
                return res.status(HttpStatus.OK).json(producto);
            }else{
                return  res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Producto no encontrado</h1>');            
        }
    }
    @Put('/update/:productoID')
    async updateProducto(@Req() req, @Res() res,@Param('productoID') productoID, @Body() createProductoDTO:CreateProductoDTO){
        try {
            const cabecera = req.headers['autorization'];
            const usuario = await this.usuarioService.getToken(cabecera);
            console.log('hasta aqui');
            if (cabecera === usuario.token){
                const producto = await this.productoService.updateProducto(productoID, createProductoDTO);
                return res.status(HttpStatus.OK).json(producto);
            }else{
                return  res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
            }
            
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Producto no encontrado</h1>');            
            
        }
    }

}
