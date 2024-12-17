import { isBoolean, IsBoolean, IsDecimal, IsEmail, IsString } from "class-validator";

export class CreateGiftCardDto {
    @IsDecimal()
    amount: number;
  
    
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    email: string;
  
  
  }