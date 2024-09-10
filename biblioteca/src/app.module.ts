import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutorModule } from './autor/autor.module';
import { LibroModule } from './libro/libro.module';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [AutorModule, LibroModule, CategoriaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
