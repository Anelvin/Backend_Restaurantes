import { Controller, Get, Post, Put, Delete, Res, HttpStatus,Body } from '@nestjs/common';
import {CreateProductoDTO} from './dto/producto.dto';

@Controller('/producto')
export class ProductoController {

    @Post('/create')
    createPost(@Res() res,@Body() createProductoDTO:CreateProductoDTO){
        console.log(createProductoDTO);
        return res.status(HttpStatus.OK).json({
            mensaje:'recibido'
        })
    }

}
