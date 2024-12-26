 import { Business } from 'src/business/business.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
 

@Entity("gift_cards")
export class GiftCard {
  @PrimaryGeneratedColumn()
  id: number;  

  @ManyToOne(() => Business, (business) => business.giftCards)
  @JoinColumn({ name: 'business_id' })
  business: Business;  

  @ManyToOne(() => User, (user) => user.giftCards, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User; 

  @Column({ length: 100 })
  name: string;
  
  @Column()
  email: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number; 

  @Column('decimal', { precision: 10, scale: 2,default: 0 })
  amount_spent: number;
  

  @Column('date')
  date_delivery: Date;

  @Column('text')
  message: string;

  @Column({ unique: true })
  code: string;  


  @Column({ length: 20, default: 'pending' })
  status: string; 

  @CreateDateColumn()
  createdAt: Date;  

  @UpdateDateColumn()
  updatedAt: Date;  
}
