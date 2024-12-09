import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './business.entity';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,  
  ) {}

  // Crear un nuevo negocio
  async create(createBusinessDto: CreateBusinessDto): Promise<Business> {
    const business = this.businessRepository.create(createBusinessDto);  
    return this.businessRepository.save(business); 
  }

  // Obtener todos los negocios
  async findAll(): Promise<Business[]> {
    return this.businessRepository.find();  
  }

  // Obtener un negocio por su ID
  async findOne(id: number): Promise<Business> {
    const business = await this.businessRepository.findOne({ where: { id } });
    if (!business) {
       throw new NotFoundException(`Business with ID ${id} not found`);
    }
    return business;
  }

  // Actualizar un negocio
  async update(id: number, updateBusinessDto: UpdateBusinessDto): Promise<Business> {
    const business = await this.businessRepository.findOne({ where: { id } });
    if (!business) {
       throw new NotFoundException(`Business with ID ${id} not found`);
    }

     const updatedBusiness = Object.assign(business, updateBusinessDto);
    return this.businessRepository.save(updatedBusiness); 
  }

  // Eliminar un negocio
  async remove(id: number): Promise<void> {
    const business = await this.businessRepository.findOne({ where: { id } });
    if (!business) {
       throw new NotFoundException(`Business with ID ${id} not found`);
    }

    await this.businessRepository.remove(business);
  }
}