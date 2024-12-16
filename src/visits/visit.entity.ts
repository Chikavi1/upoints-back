 import { Business } from "src/business/business.entity";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'visit' })

export class Visit {
    @PrimaryGeneratedColumn()
    id: number; // Identificador único de la visita (PK)
  
    @ManyToOne(() => User, (user) => user.visits, { eager: true })
    user: User; // Relación con la tabla Users (FK)
  
    @ManyToOne(() => Business, (business) => business.visits, { eager: true })
    business: Business; // Relación con la tabla Business (FK)
  
    @Column({ type: 'date' })
    date: Date; // Fecha de la visita
  
    @Column({ type: 'int', default: 0 })
    points: number; // Puntos obtenidos en esta visita
  
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    amount: number; // Monto gastado en la visita
  
    @CreateDateColumn()
    createdAt: Date; // Fecha de creación del registro de visita
  }
