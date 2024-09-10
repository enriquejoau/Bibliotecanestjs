import { Module } from '@nestjs/common';
import { AutorController } from './autor.controller';
import { AutoresService} from './autor.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AutorController],
  providers: [AutoresService, PrismaService]
})
export class AutorModule {}
