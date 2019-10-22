import { Controller, Get, Post, Delete, Put, Res, HttpStatus, Body, Param } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDTO } from './dto/proveedor.dto';
import { Proveedor } from './interfaces/proveedor.interface';

@Controller('proveedor')
export class ProveedorController {

    constructor(private proveedorService:ProveedorService){}

    @Post('/create')
    async createProducto(@Res() res, @Body() createProveedorDTO:CreateProveedorDTO){
        try {
            const proveedor = await this.proveedorService.createProveedor(createProveedorDTO);
            return res.status(HttpStatus.OK).json(proveedor);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>Ha ocurrido un problema al intentar crear el proveedor</p>');
        }
    } 
    
    @Get()
    async getProveedores(@Res() res,):Promise<Proveedor[]>{
        try {
            const proveedores = await this.proveedorService.getProveedores();
            res.status(HttpStatus.OK).json(proveedores);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>No se han encontrado proveedores</p>');
        }
    }
    @Get('/:proveedorID')
    async getProveedor(@Res() res, @Param('proveedorID') proveedorID:string):Promise<Proveedor>{
        try {
            const proveedor = await this.proveedorService.getProveedor(proveedorID);
            return res.status(HttpStatus.OK).json(proveedor);            
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>No se ha encontrado ningún proveedor</p>');            
        }
    }
    @Delete('/delete/:proveedorID')
    async deleteProveedor(@Res() res, @Param('proveedorID') proveedorID:string):Promise<Proveedor>{
        try {
            const proveedor = await this.proveedorService.deleteProveedor(proveedorID);
            return res.status(HttpStatus.OK).json(proveedor);                        
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>Ha ocurrido un problema al intentar eliminar el proveedor</p>');               
        }
    }
    @Put('/update/:proveedorID')
    async updateProveedor(@Res() res, @Param('proveedorID') proveedorID:string, @Body() createProveedorDTO:CreateProveedorDTO):Promise<Proveedor>{
        try {
            const proveedor = await this.proveedorService.updateProveedor(proveedorID,createProveedorDTO);
            return res.status(HttpStatus.OK).json(proveedor);                        
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>Ha ocurrido un problema al intentar actualizar el proveedor</p>');            
          
        }
    }

}
