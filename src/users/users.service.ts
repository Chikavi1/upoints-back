import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Like, Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto'
import { updateUserDto } from './dto/update-user.dto';
import { createProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
) {

    }

    async createUser(user: createUserDto){

        console.log('est apueta mierda se ejecuta e el servicio')

        const userFound = await this.userRepository.findOne({
            where: {
                email: user.email
            }
        })

        if(userFound){
            return new HttpException('User already exists', 409)
        }


        const newUser = this.userRepository.create(user)
        return this.userRepository.save(newUser)
    }


    async search(query: string) {
        const result = await this.userRepository.find({
            where: [
                { email: Like(`%${query}%`) },
                { phone: Like(`%${query}%`)  }
            ],
            order: { name: 'ASC' },
            take: 5
        });
        return result;
    }

   async getUsers(page: number){
    try{
        const take = 15;
        const skip = isNaN(page) ? 1 : Math.max(page, 1); 

        const [users,total] = await this.userRepository.findAndCount({
            skip: skip,
            take: take,
            order: { createdAt: 'DESC' }
        })

        return {
            data: users,
            total,
            page,
            pageCount: Math.ceil(total / take),
        }
    }catch(error){
        console.error('Error al obtener usuarios:', error);
        throw new Error('No se pudieron obtener los usuarios. Intente nuevamente más tarde.');
    }
    }

    getUser(id: number){
        const userFound = this.userRepository.findOne({
            where: {
                id: id
            }
        })

        if(!userFound){
            return new HttpException('User already no exists', HttpStatus.CONFLICT)
        }
        return userFound
    }

    async deleteUser(id: number){
       const result = await this.userRepository.delete(id);
       if(result.affected === 0){
        throw new HttpException('User not found', HttpStatus.NOT_FOUND)
       }

       return this.userRepository.delete(id);
    }


    updateUser(id: number, user: updateUserDto){

        const userFound = this.userRepository.findOne({
            where: {
                id
            }
        })

        if(!userFound){
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return this.userRepository.update(id, user)
    }
    

    
}
