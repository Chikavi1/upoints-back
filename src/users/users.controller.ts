import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Request } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { updateUserDto } from './dto/update-user.dto';
import { createProfileDto } from './dto/create-profile.dto';
import { query } from 'express';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Get()
    getUsers(@Query('page') page: number) {
        return this.usersService.getUsers(page)
    }

    @Get(':id')
    getUser(@Param() id: number) {
        return this.usersService.getUser(id)
    }

    @Post()
    createUser(@Request() req, @Body() newUser: createUserDto){
        console.log('se ejeucta esta mietrda')
        console.log(req)
        return this.usersService.createUser(newUser)  
    }   

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: updateUserDto){
        return this.usersService.updateUser(id, user)
    }


    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.usersService.deleteUser(id)
    }


  

}
