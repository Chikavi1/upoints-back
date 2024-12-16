import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';

@Module({
  imports: [], // Importa TypeOrmModule aquí
  providers: [StripeService],
  controllers: [StripeController],
})
export class StripeModule {}