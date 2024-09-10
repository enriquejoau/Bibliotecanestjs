import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createLibroDto } from './dto/create-libro.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { updateLibroDto } from './dto/update-libro.dto';

@Injectable()
export class LibroService {
    constructor(private prisma: PrismaService){}
    async getLibros(){
        try{
            const Libros = await this.prisma.libro.findMany({
                include: {
                    autor: true,
                    categorias: {
                      include: {
                        categoria: true, 
                      },
                    },
                },
            });
            return Libros;

        }catch(error){
            if(error instanceof Error)
            throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getLibro(id:number){
        try{
            const libro = await this.prisma.libro.findFirst({
                where:{id},
                include: {
                    autor: true,
                    categorias: true,
                  },
            });
            if (!libro) {
                throw new NotFoundException(`El libro con el ID ${id} no fue encontrado`);
            }
        }catch (error){
            if(error instanceof NotFoundException)
                throw new NotFoundException(error.message)
            if(error instanceof Error)
                throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createLibro(libro: createLibroDto) {
      const { titulo, fecha_publicacion, autorId, categoriaIds } = libro;
  
      // Verificar si las categorías existen
      const categoriasExistentes = await this.prisma.categoria.findMany({
        where: { id: { in: categoriaIds } },
      });
  
      if (categoriasExistentes.length !== categoriaIds.length) {
        throw new NotFoundException('Una o más categorías no existen');
      }
  
      return this.prisma.libro.create({
        data: {
          titulo,
          fecha_publicacion,
          autor: {
            connect: { id: autorId },
          },
          categorias: {
            create: categoriaIds.map((id) => ({
              categoria: { connect: { id } },
            })),
          },
        },
      });
    }

    async updateLibro(id: number, data: updateLibroDto) {
      const { titulo, fecha_publicacion, autorId, categoriaIds } = data;
  
      const libroExistente = await this.prisma.libro.findUnique({ where: { id } });
      if (!libroExistente) {
        throw new NotFoundException(`El libro con el ID ${id} no fue encontrado`);
      }
  
      // Verificar si las categorías existen
      const categoriasExistentes = await this.prisma.categoria.findMany({
        where: { id: { in: categoriaIds } },
      });
  
      if (categoriasExistentes.length !== categoriaIds.length) {
        throw new NotFoundException('Una o más categorías no existen');
      }
  
      return this.prisma.libro.update({
        where: { id },
        data: {
          titulo,
          fecha_publicacion,
          autor: {
            connect: { id: autorId }, // Actualizar el autor
          },
          categorias: {
            deleteMany: {}, // Elimina las categorías existentes
            create: categoriaIds.map((id) => ({
              categoria: { connect: { id } },
            })), // Conecta las nuevas categorías
          },
        },
      });
    }

      async deleteLibro(id: number) {
        try {
          const libroExistente = await this.prisma.libro.findUnique({ where: { id } });
          if (!libroExistente) {
            throw new NotFoundException(`El libro con el ID ${id} no fue encontrado`);
          }
    
          const deleteLibro = await this.prisma.libro.delete({
            where: { id },
          });
          return deleteLibro;
        } catch (error) {
          if (error instanceof PrismaClientKnownRequestError) {
            throw new NotFoundException(`El libro con el ID ${id} no fue encontrado`);
          }
          if (error instanceof Error)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
