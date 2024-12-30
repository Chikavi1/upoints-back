import { IsNotEmpty, IsNumber, IsString, ValidateNested, IsArray, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

class SourceDto {
  @IsString()
  @IsNotEmpty()
  object: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsNumber()
  @IsNotEmpty()
  exp_month: number;

  @IsNumber()
  @IsNotEmpty()
  exp_year: number;

  @IsString()
  @IsNotEmpty()
  cvc: string;
}

class CartItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @ValidateNested()
  @Type(() => SourceDto)
  @IsObject()
  @IsNotEmpty()
  source: SourceDto;

  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  @IsArray()
  @IsNotEmpty()
  items: CartItemDto[];
}