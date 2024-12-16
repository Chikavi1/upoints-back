import { Type } from 'class-transformer';
import { IsOptional, IsDate, IsInt, IsNumber } from 'class-validator';

export class CreateVisitDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date) 
  date?: Date;

  @IsInt()
  userId?: number;

  @IsInt()
  businessId?: number;

  @IsOptional()
  @IsInt()
  points?: number;

  @IsOptional()
  @IsNumber()
  amount?: number;
}
