import { IsOptional, IsInt, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVisitDto {
  @IsInt()
  userId: any;

  @IsInt()
  businessId: any;

  @IsOptional()
  @IsDate()
  @Type(() => Date) 
  date?: Date;

  @IsOptional()
  @IsInt()
  points?: number;

  @IsOptional()
  @IsNumber()
  amount?: number;
}