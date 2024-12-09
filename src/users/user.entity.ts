import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BeforeInsert,
    OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Visit } from 'src/visits/visit.entity';
import { GiftCard } from 'src/gift-card/gift-card.entity';
 
@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true, length: 15 })
    phone: string;

    @Column({ type: 'date', nullable: true })
    birthday: Date;

    @Column({ default: 0, type: 'int' })
    loyalty_points: number;

    @Column( {nullable: true, length: 20})
    identification:string

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Visit, (visit) => visit.user)
    visits: Visit[];

    @OneToMany(() => GiftCard, (giftCard) => giftCard.user)
    giftCards: GiftCard[];



    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}