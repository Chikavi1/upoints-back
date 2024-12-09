import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';  
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,  
  ) {}

  // Crear una nueva notificación
  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepository.create(createNotificationDto);  
    return this.notificationRepository.save(notification);  
  }

  // Obtener todas las notificaciones
  async findAll(): Promise<Notification[]> {
    return this.notificationRepository.find(); 
  }

  // Obtener una notificación por su ID
  async findOne(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({ where: { id } });
    if (!notification) {
       throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return notification;
  }

  // Actualizar una notificación
  async update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({ where: { id } });
    if (!notification) {
       throw new NotFoundException(`Notification with ID ${id} not found`);
    }

     const updatedNotification = Object.assign(notification, updateNotificationDto);
    return this.notificationRepository.save(updatedNotification); 
  }

  // Eliminar una notificación
  async remove(id: number): Promise<void> {
    const notification = await this.notificationRepository.findOne({ where: { id } });
    if (!notification) {
       throw new NotFoundException(`Notification with ID ${id} not found`);
    }

     await this.notificationRepository.remove(notification);
  }
}
