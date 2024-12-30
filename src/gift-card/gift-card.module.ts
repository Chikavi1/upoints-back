import { Module } from '@nestjs/common';
import { GiftCardService } from './gift-card.service';
import { GiftCardController } from './gift-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCard } from './gift-card.entity';
import { MailService } from 'src/mail/email/email.service';
import { StripeService } from 'src/stripe/stripe.service';

@Module({
  imports: [TypeOrmModule.forFeature([GiftCard])],
  controllers: [GiftCardController],
  providers: [GiftCardService, MailService,StripeService ],
})
export class GiftCardModule {}
