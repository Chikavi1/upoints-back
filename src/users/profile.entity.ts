import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('user_profile')
export class Profile{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    email:string

    @Column()
    password:string

    @Column()
    birthday:number

    @Column()
    identification:string

    @Column()
    phone:string
    
}