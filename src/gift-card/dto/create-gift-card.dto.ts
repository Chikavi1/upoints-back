import { IsBoolean, IsDecimal, IsString } from "class-validator";

export class CreateGiftCardDto {
    @IsString()
    code: string;
  
    @IsDecimal()
    amount: number;
  
    @IsBoolean()
    isActive: boolean;
  }