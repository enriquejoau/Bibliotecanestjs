import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class UpdateAutorDto{
    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsDateString()
    @IsNotEmpty()
    fecha_nacimiento: Date
    
    @IsString()
    @IsNotEmpty()
    nacionalidad: string
}