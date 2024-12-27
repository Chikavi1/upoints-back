import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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

   searchGiftCards(query: string) {
    return this.giftCardRepository.find({
        where: [
          { email: ILike(`%${query}%`) },
        ],
      });
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: GiftCard[]; pagination: any }> {
    
    console.log(page, limit)
    
  const [data, total] = await this.giftCardRepository.findAndCount({
    relations: ['user', 'business'],
    take: limit,
    skip: (page - 1) * limit,
    order: { createdAt: 'DESC' },
  });

  return {
    data,
    pagination: {
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      limit,
    },
  };
}
 
  
  async findOne(id: number): Promise<GiftCard> {
    const giftCard = await this.giftCardRepository.findOne({ where: { id } });
    if (!giftCard) {
       throw new NotFoundException(`GiftCard with ID ${id} not found`);
    }
    return giftCard;
  }

 
  async update(id: number, updateGiftCardDto: UpdateGiftCardDto): Promise<GiftCard> {
    const giftCard = await this.giftCardRepository.findOne({ where: { id } });
    if (!giftCard) {
       throw new NotFoundException(`GiftCard with ID ${id} not found`);
    }

     const updatedGiftCard = Object.assign(giftCard, updateGiftCardDto);
    return this.giftCardRepository.save(updatedGiftCard);  
  }
 
  async remove(id: number): Promise<void> {
    const giftCard = await this.giftCardRepository.findOne({ where: { id } });
    if (!giftCard) {
       throw new NotFoundException(`GiftCard with ID ${id} not found`);
    }
     await this.giftCardRepository.remove(giftCard);
  }


  async pay(data) {

    console.log(data)


    const giftCard = this.giftCardRepository.create(data);  
  }
}
