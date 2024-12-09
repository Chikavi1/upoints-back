import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsOptional, IsEnum, IsUrl } from 'class-validator';

// Define las categorías posibles de negocio
enum BusinessCategory {
  RESTAURANTE = 'restaurante',
  TIENDA = 'tienda',
  OTRO = 'otro',
}

export class CreateBusinessDto {
  @IsString()
  @IsNotEmpty()
  name: string;  

  @IsString()
  @IsOptional()
  description?: string;  

  @IsEmail()
  @IsNotEmpty()
  email: string;  

  @IsPhoneNumber(null)
  @IsOptional()
  phone?: string;  

  @IsString()
  @IsNotEmpty()
  address: string;  

  @IsEnum(BusinessCategory)
  @IsNotEmpty()
  category: BusinessCategory;  

  @IsUrl()
  @IsOptional()
  logoUrl?: string; 

  @IsOptional()
  createdAt?: Date;  

  @IsOptional()
  updatedAt?: Date;  
}
