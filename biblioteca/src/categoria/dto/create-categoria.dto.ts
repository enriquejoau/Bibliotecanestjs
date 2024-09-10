import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class createCategoriaDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    nombre: string
}