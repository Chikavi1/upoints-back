import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './visit.entity';
  
@Module({
  imports: [TypeOrmModule.forFeature([Visit])],
  controllers: [VisitsController],
  providers: [VisitsService],
})
export class VisitsModule {}
