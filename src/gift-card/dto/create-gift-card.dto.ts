import { IsBoolean, IsDecimal, IsEmail, IsString } from "class-validator";

export class CreateGiftCardDto {
    @IsString()
    code: string;
  
    @IsDecimal()
    amount: number;
  
    @IsBoolean()
    isActive: boolean;
  
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    email: string;
  
  
  }