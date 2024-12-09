import { Business } from "src/business/business.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('notifications')
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;  
  
    @ManyToOne(() => Business, (business) => business.notifications, { nullable: true })
    @JoinColumn({ name: 'business_id' })
    business: Business;  
  
    @Column({ type: 'text' })
    message: string; 
  
    @Column({ length: 50 })
    type: string;  
  
    @CreateDateColumn()
    createdAt: Date;  
  }