import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createAutorDto } from './dto/create-autor.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateAutorDto } from './dto/update-autor.dto';

@Injectable()
export class AutoresService {
    constructor(private prisma: PrismaService){}
    async getAutores(){
        try{
            const Autores = await this.prisma.autor.findMany()
            return Autores;

        }catch(error){
            if(error instanceof Error)
            throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAutor(id:number){
        try{
            const autor = await this.prisma.autor.findFirst({
                where:{id}
            })
            if(autor) return autor;
            throw new NotFoundException("el autor con ese id ${id} no se encontro")
        }catch (error){
            if(error instanceof NotFoundException)
                throw new NotFoundException(error.message)
            if(error instanceof Error)
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createAutor(autor : createAutorDto){
        try{
            const newAutor = await this.prisma.autor.create({
                data:{
                    nombre: autor.nombre,
                    fecha_nacimiento: autor.fecha_nacimiento,
                    nacionalidad:autor.nacionalidad
                }
            })

            return newAutor;
        }
        catch(error){
            if(error instanceof Error)
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateAutor(id:number, data: UpdateAutorDto){
        try{
            const updateAutor = await this.prisma.autor.update({
                where:{
                    id
                },
                data:{
                    nombre: data.nombre,
                    fecha_nacimiento: data.fecha_nacimiento,
                    nacionalidad:data.nacionalidad
                }
            })
            return updateAutor;
        }catch(error){
            if(error instanceof PrismaClientKnownRequestError)
                throw new NotFoundException("The task with id ${id} is not found")
            if(error instanceof Error)
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteAutor(id: number){
        try{
            const deleteAutor = await this.prisma.autor.delete({
                where:{
                    id
                }
            })
            return deleteAutor;
        }catch(error){
            if(error instanceof PrismaClientKnownRequestError)
                throw new NotFoundException("El autor con ese id ${id} no fue encontrado")
            if(error instanceof Error)
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
