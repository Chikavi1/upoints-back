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

  @Column({ unique: true })
  code: string;  

  @Column()
  email: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number; 

  @Column()
  expiryDate: Date;   

  @Column({ length: 20 })
  status: string; 

  @CreateDateColumn()
  createdAt: Date;  

  @UpdateDateColumn()
  updatedAt: Date;  
}
