import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { GiftCard } from './gift-card.entity';  
import { CreateGiftCardDto } from './dto/create-gift-card.dto';
import { UpdateGiftCardDto } from './dto/update-gift-card.dto';
import { StripeService } from '../stripe/stripe.service';
import { MailService } from 'src/mail/email/email.service';

@Injectable()
export class GiftCardService {
  constructor(
    @InjectRepository(GiftCard)
    private readonly giftCardRepository: Repository<GiftCard>,  
    private readonly emailService: MailService,
    private readonly StripeService: StripeService,
  ) {}

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


 async pay(data: any) {
    const paymentResult = await this.processPayment(data);
    if (!paymentResult.success) {
      throw new Error('Payment failed: ' + paymentResult.error);
    }
    await this.createGiftCardRecords(data.items,data.email);
    await this.sendEmails(data.items);
    return { success: true, message: 'Payment processed and emails sent successfully.' };
 }
  
  
  private async processPayment(data: any) {
    try {      
      const paymentResponse = await this.StripeService.createPaymentIntent(data.token, data.total, data.currency)
      return { success: true, paymentResponse };
    }catch (error) {
      return { success: false, error: error.message };
    }
  }

  private async createGiftCardRecords(items: any[], emailFrom: string){
     const giftCards = items.map(item => { 
        item.email_from = emailFrom;
        item.code = this.generateCode()
      return this.giftCardRepository.create(item)
    });
    await this.giftCardRepository.save(giftCards.flat()); 
  }

  private async sendEmails(items: any[]) {
    for (const item of items) {
      await this.emailService.sendMail(
        item.email,
        'You have received a gift card!',
        'no se',
        `
          <h1>You've received a gift card!</h1>
          <img src="${item.image}" alt="Gift Card Image" />
          <p><strong>From:</strong> ${item.name}</p>
          <p><strong>Message:</strong> ${item.message}</p>
        `,
      );

    }
  }

  
}
