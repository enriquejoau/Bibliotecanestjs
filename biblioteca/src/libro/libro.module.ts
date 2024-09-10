import { Module } from '@nestjs/common';
import { LibroController } from './libro.controller';
import { LibroService } from './libro.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LibroController],
  providers: [LibroService, PrismaService]
})
export class LibroModule {}
