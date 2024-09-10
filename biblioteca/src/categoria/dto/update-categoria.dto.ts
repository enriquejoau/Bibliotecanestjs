import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class updateCategoriaDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    nombre: string
}