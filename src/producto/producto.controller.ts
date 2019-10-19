import { Controller, Get, Post, Put, Delete, Res, HttpStatus,Body, Param } from '@nestjs/common';
import { CreateProductoDTO } from './dto/producto.dto';
import { ProductoService } from './producto.service';
import { Producto } from './interfaces/producto.interface';

@Controller('/producto')
export class ProductoController {

    constructor(private productoService:ProductoService){}
    @Post('/create')
    async createPost(@Res() res,@Body() createProductoDTO:CreateProductoDTO){
        const producto = await this.productoService.createProducto(createProductoDTO)
        return res.status(HttpStatus.OK).json({
            mensaje:'Producto creado!!!',
            producto:producto
        })
    }
    @Get()
    async getProductos(@Res() res){
        const productos = await this.productoService.getProductos();
        return res.status(HttpStatus.OK).json(productos);
    }
    @Get('/:productoID')
    async getProducto(@Res() res,@Param('productoID') productoID){
        try {
            const producto = await this.productoService.getProducto(productoID);
            return res.status(HttpStatus.OK).json(producto);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Producto no encontrado</h1>');
        }

    }
    @Delete('/delete/:productoID')
    async deleteProducto(@Res() res, @Param('productoID') productoID){
        try {
            const producto = await this.productoService.deleteProducto(productoID);
            return res.status(HttpStatus.OK).json(producto);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Producto no encontrado</h1>');            
        }
    }
    @Put('/update/:productoID')
    async updateProducto(@Res() res,@Param('productoID') productoID, @Body() createProductoDTO:CreateProductoDTO){
        try {
            const producto = await this.productoService.updateProducto(productoID, createProductoDTO);
            return res.status(HttpStatus.OK).json(producto)
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Producto no encontrado</h1>');            
            
        }
    }

}
