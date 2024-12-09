import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {

    constructor(

        @InjectRepository(Post) private postRepository: Repository<Post>,
        private usersService: UsersService
    ){}

   async getPosts(){
        return this.postRepository.find({
            relations: ['author']
        })
    }

    createPost(post: CreatePostDto){
        const userFound = this.usersService.getUser(post.author_id)

        if(!userFound) return new HttpException('User no found',HttpStatus.NOT_FOUND)

        const newPost = this.postRepository.create(post)
        return this.postRepository.save(newPost)
    }

}
