import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';
import { Post } from './post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UsersModule], // Importa TypeOrmModule aquí
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}