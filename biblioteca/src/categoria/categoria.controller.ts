import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { createCategoriaDto } from './dto/create-categoria.dto';
import { updateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriaController {
    constructor(private categoriasServices: CategoriaService){}

    @Get()
    async getCategorias(){
        return await this.categoriasServices.getCategorias()
    }

    @Get('/:id')
    async getCategoria(@Param('id', ParseIntPipe) id: number){
        return await this.categoriasServices.getCategoria(id)
    }

    @Post()
    async createCategoria(@Body() categoria:createCategoriaDto){
        return await this.categoriasServices.createCategoria(categoria)
    }

    @Put('/:id')
    async updateCategoria(@Param('id',ParseIntPipe) id:number, @Body() data:updateCategoriaDto){
        return await this.categoriasServices.updateCategoria(id,data)
    }

    @Delete('/:id')
    async deleteCategoria(@Param('id', ParseIntPipe) id: number){
        return await this.categoriasServices.deleteCategoria(id);
    }

}
