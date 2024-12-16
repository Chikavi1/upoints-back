import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visit } from './visit.entity'; 
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Injectable()
export class VisitsService {
  constructor(
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,  
  ) {}

  // Crear una nueva visita
  async create(createVisitDto: CreateVisitDto): Promise<Visit> {
     const visit = this.visitRepository.create(createVisitDto); 
     return this.visitRepository.save(visit);  
  }

  // Obtener todas las visitas
async findAll(): Promise<Visit[]> {
  return this.visitRepository.find({
    relations: ['user', 'business'],
    // where: { businessId: 1 },
  });
}
  
  // Obtener una visita por su ID
  async findOne(id: number): Promise<Visit> {
    const visit = await this.visitRepository.findOne({ where: { id } });
    if (!visit) {
      throw new NotFoundException(`Visit with ID ${id} not found`);
    }
    return visit;
  }

  // Actualizar una visita
  async update(id: number, updateVisitDto: UpdateVisitDto): Promise<Visit> {
    const visit = await this.visitRepository.findOne({ where: { id } });
    if (!visit) {
      throw new NotFoundException(`Visit with ID ${id} not found`);
    }

    const updatedVisit = Object.assign(visit, updateVisitDto);
    return this.visitRepository.save(updatedVisit); 
  }

  // Eliminar una visita
  async remove(id: number): Promise<void> {
    const visit = await this.visitRepository.findOne({ where: { id } });
    if (!visit) {
      throw new NotFoundException(`Visit with ID ${id} not found`);
    }

    await this.visitRepository.remove(visit);
  }
}
