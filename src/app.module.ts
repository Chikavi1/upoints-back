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
  
 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'upoints',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,  
    
    }),
    UsersModule,
    PostsModule,
    VisitsModule,
    BusinessModule,
    NotificationsModule,
    GiftCardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
