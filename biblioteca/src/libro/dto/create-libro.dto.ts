import { ArrayNotEmpty, IsArray, IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class createLibroDto{
    @IsString()
    @IsNotEmpty()
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