import { isBoolean, IsBoolean, IsDecimal, IsEmail, IsString } from "class-validator";

export class CreateGiftCardDto {


    @IsString()
    name: string
  
  
    @IsString()
    message: string;
  
  
    @IsString()
    date_delivery: Date;

    @IsDecimal()
    amount: number;
  
    
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    email: string;
  
  
  }