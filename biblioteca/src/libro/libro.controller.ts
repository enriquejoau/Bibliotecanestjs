import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { LibroService } from './libro.service';
import { createLibroDto } from './dto/create-libro.dto';
import { updateLibroDto } from './dto/update-libro.dto';

@Controller('libros')
export class LibroController {
    constructor(private libroServices: LibroService){}

    @Get()
    async getLibros(){
        return await this.libroServices.getLibros()
    }

    @Get('/:id')
    async getLibro(@Param('id', ParseIntPipe) id: number){
        return await this.libroServices.getLibro(id)
    }

    @Post()
    async createLibro(@Body() libro:createLibroDto){
        return await this.libroServices.createLibro(libro)
    }

    @Put('/:id')
    async updateLibro(@Param('id',ParseIntPipe) id:number, @Body() data:updateLibroDto){
        return await this.libroServices.updateLibro(id,data)
    }

    @Delete('/:id')
    async deleteLibro(@Param('id', ParseIntPipe) id: number){
        return await this.libroServices.deleteLibro(id);
    }
}
