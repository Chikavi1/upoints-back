import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GiftCard } from './gift-card.entity';  
import { CreateGiftCardDto } from './dto/create-gift-card.dto';
import { UpdateGiftCardDto } from './dto/update-gift-card.dto';

@Injectable()
export class GiftCardService {
  constructor(
    @InjectRepository(GiftCard)
    private readonly giftCardRepository: Repository<GiftCard>,  
  ) {}

  // Crear una nueva tarjeta de regalo
  async create(createGiftCardDto: CreateGiftCardDto): Promise<GiftCard> {
    const giftCard = this.giftCardRepository.create(createGiftCardDto);  
    return this.giftCardRepository.save(giftCard);  
  }

  generateCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  }

  // Obtener todas las tarjetas de regalo
  async findAll(): Promise<GiftCard[]> {
    return this.giftCardRepository.find(); 
  }

  // Obtener una tarjeta de regalo por su ID
  async findOne(id: number): Promise<GiftCard> {
    const giftCard = await this.giftCardRepository.findOne({ where: { id } });
    if (!giftCard) {
       throw new NotFoundException(`GiftCard with ID ${id} not found`);
    }
    return giftCard;
  }

  // Actualizar una tarjeta de regalo
  async update(id: number, updateGiftCardDto: UpdateGiftCardDto): Promise<GiftCard> {
    const giftCard = await this.giftCardRepository.findOne({ where: { id } });
    if (!giftCard) {
       throw new NotFoundException(`GiftCard with ID ${id} not found`);
    }

     const updatedGiftCard = Object.assign(giftCard, updateGiftCardDto);
    return this.giftCardRepository.save(updatedGiftCard);  
  }

  // Eliminar una tarjeta de regalo
  async remove(id: number): Promise<void> {
    const giftCard = await this.giftCardRepository.findOne({ where: { id } });
    if (!giftCard) {
       throw new NotFoundException(`GiftCard with ID ${id} not found`);
    }

     await this.giftCardRepository.remove(giftCard);
  }
}
