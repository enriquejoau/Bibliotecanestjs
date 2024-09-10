import { IsDateString, IsNotEmpty, IsString, MinLength } from "class-validator";

export class createAutorDto{
    @IsString()
 //   @IsNotEmpty()
    nombre: string

    @IsDateString()
//    @IsNotEmpty()
    fecha_nacimiento: Date
    
    @IsString()
    @IsNotEmpty()
    nacionalidad: string
}