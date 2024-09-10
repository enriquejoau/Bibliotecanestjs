import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AutoresService } from './autor.service';
import { createAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';

@Controller('autores')
export class AutorController {
    constructor(private autoresServices: AutoresService){}

    @Get()
    async getAutores(){
        return await this.autoresServices.getAutores()
    }

    @Get('/:id')
    async getAutor(@Param('id', ParseIntPipe) id: number){
        return await this.autoresServices.getAutor(id)
    }

    @Post()
    async createAutor(@Body() autor:createAutorDto){
        return await this.autoresServices.createAutor(autor)
    }

    @Put('/:id')
    async updateAutor(@Param('id',ParseIntPipe) id:number, @Body() data:UpdateAutorDto){
        return await this.autoresServices.updateAutor(id,data)
    }

    @Delete('/:id')
    async deleteAutor(@Param('id', ParseIntPipe) id: number){
        return await this.autoresServices.deleteAutor(id);
    }

}
