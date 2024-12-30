 import { Business } from 'src/business/business.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
 

@Entity("gift_cards")
export class GiftCard {
  @PrimaryGeneratedColumn()
  id: number;  

  // @ManyToOne(() => Business, (business) => business.giftCards)
  // @JoinColumn({ name: 'business_id' })
  // business: Business;  

  @ManyToOne(() => Business, (business) => business.giftCards, { eager: true })
  business: Business;  


  @ManyToOne(() => User, (user) => user.giftCards, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User; 

  @Column({ type: 'varchar', nullable: false }) // NOT NULL
  name: string;
  
  @Column()
  email: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number; 

  @Column('decimal', { precision: 10, scale: 2,default: 0 })
  amount_spent: number;
  
 @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_delivery: Date; // Fecha de la visita

  @Column('text')
  message: string;

  @Column({ unique: true })
  code: string;  

  @Column({ length: 20, default: 'pending' })
  status: string; 

  @Column()
  image: string;

  @Column()
  email_from: string;

  @CreateDateColumn()
  createdAt: Date;  

  @UpdateDateColumn()
  updatedAt: Date;  
}
