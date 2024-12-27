import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { VisitsModule } from './visits/visits.module';
import { BusinessModule } from './business/business.module';
import { NotificationsModule } from './notifications/notifications.module';
import { GiftCardModule } from './gift-card/gift-card.module';
  
import { StripeModule } from './stripe/stripe.module';
import { MailModule } from './mail/email/email.module';
import { MailController } from './mail/email/email.controller';
import { AuthModule } from './auth/auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'nest_user',
      password: 'nest_password',
      database: 'nestjs_db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,  
    
    }),
    UsersModule,
    PostsModule,
    VisitsModule,
    BusinessModule,
    NotificationsModule,
    StripeModule,
    GiftCardModule,
    MailModule,
    AuthModule
  ],
    
  controllers: [AppController,MailController],
  providers: [AppService],
})
export class AppModule {}
