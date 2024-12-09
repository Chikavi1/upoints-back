import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class createUserDto{
    @IsNotEmpty()  
    name: string;
  
    @IsNotEmpty() 
    @IsEmail()   
    email: string;
  
    @IsNotEmpty()   
    @MinLength(6)   
    password: string;
  
    @IsNotEmpty()   
    birthday: string;

    @IsOptional()
    phone?: string

    @IsOptional()
    addVisit: string

    @IsNotEmpty()
    gender:string

}