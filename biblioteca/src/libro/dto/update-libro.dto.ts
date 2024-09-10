import { ArrayNotEmpty, IsArray, IsDateString, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class updateLibroDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    titulo: string

    @IsDateString()
    @IsNotEmpty()
    fecha_publicacion: Date

    @IsInt()
    @IsNotEmpty()
    autorId: number

    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    categoriaIds: number[];
}