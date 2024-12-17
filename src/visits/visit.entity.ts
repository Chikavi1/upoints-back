import { Business } from 'src/business/business.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
 
@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  id: number; // Identificador único de la visita (PK)

  @ManyToOne(() => User, (user) => user.visits, { eager: true })
  user: User; // No usar `userId`, simplemente `user`

  @ManyToOne(() => Business, (business) => business.visits, { eager: true })
  business: Business; // Igualmente aquí, usar `business` en lugar de `businessId`


  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date; // Fecha de la visita

  @Column({ type: 'int', default: 0 })
  points: number; // Puntos obtenidos en esta visita

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amount: number; // Monto gastado en la visita

  @CreateDateColumn()
  createdAt: Date; // Fecha de creación del registro de visita
}
