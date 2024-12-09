import { GiftCard } from 'src/gift-card/gift-card.entity';
import { Notification } from 'src/notifications/notification.entity';
import { Visit } from 'src/visits/visit.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity({ name: 'business' })
export class Business {
  @PrimaryGeneratedColumn()
  id: number;  

  @Column({ length: 255 })
  name: string;  

  @Column({ type: 'text', nullable: true })
  description: string;  

  @Column({ unique: true })
  email: string;  

  @Column({ length: 20, nullable: true })
  phone: string;  

  @Column({ type: 'text', nullable: true })
  address: string;  

  @Column({ length: 100 })
  category: string; 

  @Column({ type: 'text', nullable: true })
  logoUrl: string;  

  @CreateDateColumn()
  createdAt: Date;  

  @UpdateDateColumn()
  updatedAt: Date;  

  @OneToMany(() => Visit, (visit) => visit.business)
    visits: Visit[];

    @OneToMany(() => Notification, (notification) => notification.business)
    notifications: Notification[];

    @OneToMany(() => GiftCard, (giftCard) => giftCard.business)
    giftCards: GiftCard[];

  }


 