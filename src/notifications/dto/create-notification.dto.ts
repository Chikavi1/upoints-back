import { IsString } from "class-validator";

export class CreateNotificationDto {
    @IsString()
    message: string;
  
    @IsString()
    business_id: number;
    
  }