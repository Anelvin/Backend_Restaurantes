import { Module } from '@nestjs/common';
import { ProveedorController } from './proveedor.controller';
import { ProveedorService } from './proveedor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProveedorSchema } from './schema/proveedor.schema';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'Proveedor',schema:ProveedorSchema}
    ]), UsuarioModule
  ],
  controllers: [ProveedorController],
  providers: [ProveedorService]
})
export class ProveedorModule {}
