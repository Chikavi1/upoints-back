import { Business } from 'src/business/business.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
 

@Entity("gift_cards")
export class GiftCard {
  @PrimaryGeneratedColumn()
  id: number; // Identificador único de la tarjeta de regalo (PK)

  @ManyToOne(() => Business, (business) => business.giftCards)
  @JoinColumn({ name: 'business_id' })
  business: Business; // Relación con Business (FK)

  @ManyToOne(() => User, (user) => user.giftCards, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User; // Relación con User (FK), puede ser nula si no está asignada

  @Column({ unique: true })
  code: string; // Código único de la tarjeta

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number; // Monto de la tarjeta de regalo

  @Column()
  expiryDate: Date; // Fecha de expiración de la tarjeta

  @Column({ length: 20 })
  status: string; // Estado de la tarjeta (activa, usada, expiró)

  @CreateDateColumn()
  createdAt: Date; // Fecha de creación de la tarjeta

  @UpdateDateColumn()
  updatedAt: Date; // Fecha de última actualización de la tarjeta
}
