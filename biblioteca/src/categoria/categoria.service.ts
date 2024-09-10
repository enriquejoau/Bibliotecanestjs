import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createCategoriaDto } from './dto/create-categoria.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { updateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
    constructor(private prisma: PrismaService){}
    async getCategorias(){
        try{
            const Categorias = await this.prisma.categoria.findMany();
            return Categorias;

        }catch(error){
            if(error instanceof Error)
            throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getCategoria(id:number){
        try{
            const categoria = await this.prisma.categoria.findFirst({
                where:{id},
                include: { libros: true },
            });
            if (!categoria) {
                throw new NotFoundException(`La categoría con ID ${id} no fue encontrada`);
              }
              return categoria;
        }catch (error){
            if(error instanceof NotFoundException)
                throw new NotFoundException(error.message)
            if(error instanceof Error)
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createCategoria(categoria : createCategoriaDto){
        try{
            const newCategoria = await this.prisma.categoria.create({
                data:{
                    nombre: categoria.nombre
                }
            })

            return newCategoria;
        }
        catch(error){
            if(error instanceof Error)
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateCategoria(id:number, data: updateCategoriaDto){
        try{
            const updateCategoria = await this.prisma.categoria.update({
                where:{
                    id
                },
                data:{
                    nombre: data.nombre
                }
            })
            return updateCategoria;
        }catch(error){
            if(error instanceof PrismaClientKnownRequestError)
                throw new NotFoundException("The task with id ${id} is not found")
            if(error instanceof Error)
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteCategoria(id: number) {
        try {
          const categoriaExistente = await this.prisma.categoria.findUnique({
            where: { id },
            include: { libros: true }, // Verifica si tiene libros asociados
          });
    
          if (!categoriaExistente) {
            throw new NotFoundException(`La categoría con ID ${id} no fue encontrada`);
          }
    
          // Verificar si la categoría tiene libros asociados
          if (categoriaExistente.libros.length > 0) {
            throw new HttpException(
              'No se puede eliminar una categoría que tiene libros asociados.',
              HttpStatus.BAD_REQUEST,
            );
          }
    
          return await this.prisma.categoria.delete({
            where: { id },
          });
        } catch (error) {
          if (error instanceof PrismaClientKnownRequestError) {
            throw new NotFoundException(`La categoría con ID ${id} no fue encontrada`);
          }
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
}
