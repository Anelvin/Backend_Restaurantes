import { Controller, Get, Post, Delete, Put, Res, HttpStatus, Body, Param, Req } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDTO } from './dto/proveedor.dto';
import { Proveedor } from './interfaces/proveedor.interface';
import { UsuarioService } from '../usuario/usuario.service';

@Controller('proveedor')
export class ProveedorController {

    constructor(private proveedorService:ProveedorService,
        private usuarioService:UsuarioService){}

    @Post('/create')
    async createProducto(@Req() req, @Res() res, @Body() createProveedorDTO:CreateProveedorDTO){
        try {
            const cabecera = req.headers['autorization'];
            const usuario = await this.usuarioService.getToken(cabecera);
            if (cabecera === usuario.token){
                const proveedor = await this.proveedorService.createProveedor(createProveedorDTO);
                return res.status(HttpStatus.OK).json(proveedor);
            }else{
                return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>Ha ocurrido un problema al intentar crear el proveedor</p>');
        }
    } 
    @Get()
    async getProveedores(@Req() req, @Res() res,):Promise<Proveedor[]>{
        try {
            const cabecera = req.headers['autorization'];
            const usuario = await this.usuarioService.getToken(cabecera);
            if (cabecera === usuario.token){
                const proveedores = await this.proveedorService.getProveedores();
                return res.status(HttpStatus.OK).json(proveedores);
            }else{
                return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>No se han encontrado proveedores</p>');
        }
    }
    @Get('/:proveedorID')
    async getProveedor(@Req() req, @Res() res, @Param('proveedorID') proveedorID:string):Promise<Proveedor>{
        try {
            const cabecera = req.headers['autorization'];
            const usuario = await this.usuarioService.getToken(cabecera);
            if (cabecera === usuario.token){
                const proveedor = await this.proveedorService.getProveedor(proveedorID);
                return res.status(HttpStatus.OK).json(proveedor);  
            }else{
                return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
            }          
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>No se ha encontrado ningún proveedor</p>');            
        }
    }
    @Delete('/delete/:proveedorID')
    async deleteProveedor(@Req() req, @Res() res, @Param('proveedorID') proveedorID:string):Promise<Proveedor>{
        try {
            const cabecera = req.headers['autorization'];
            const usuario = await this.usuarioService.getToken(cabecera);
            if (cabecera === usuario.token){
                const proveedor = await this.proveedorService.deleteProveedor(proveedorID);
                return res.status(HttpStatus.OK).json(proveedor); 
            }else{
                return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
            }                
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>Ha ocurrido un problema al intentar eliminar el proveedor</p>');               
        }
    }
    @Put('/update/:proveedorID')
    async updateProveedor(@Req() req, @Res() res, @Param('proveedorID') proveedorID:string, @Body() createProveedorDTO:CreateProveedorDTO):Promise<Proveedor>{
        try {
            const cabecera = req.headers['autorization'];
            const usuario = await this.usuarioService.getToken(cabecera);
            if (cabecera === usuario.token){
                const proveedor = await this.proveedorService.updateProveedor(proveedorID,createProveedorDTO);
                return res.status(HttpStatus.OK).json(proveedor);    
            }else{
                return res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.UNAUTHORIZED);
            }                            
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send('<h1>Error</h1><p>Ha ocurrido un problema al intentar actualizar el proveedor</p>');            
          
        }
    }

}
