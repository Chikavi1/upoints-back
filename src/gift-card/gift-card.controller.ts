import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { GiftCardService } from './gift-card.service';
import { CreateGiftCardDto } from './dto/create-gift-card.dto';
import { UpdateGiftCardDto } from './dto/update-gift-card.dto';
import { GiftCard } from './gift-card.entity';
import { CronExpression, Cron } from '@nestjs/schedule';
 
@Controller('gift-card')
export class GiftCardController {
  constructor(private readonly giftCardService: GiftCardService) {}

  @Post()
  create(@Body() createGiftCardDto: CreateGiftCardDto) {
    const data = 
    { 
      code: this.giftCardService.generateCode(),
      expiryDate: new Date(),
    }
    const sendaData = { ...createGiftCardDto, ...data }

    return this.giftCardService.create(sendaData);
  }


  @Get('search')
  async searchGiftCards(@Query('query') query: string) {
    if (!query) {
      throw new BadRequestException('Query parameter is required');
    }

    return this.giftCardService.searchGiftCards(query);
  }

  @Get()
   async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: GiftCard[]; pagination: any }> {

    console.log(page,limit)

    return this.giftCardService.findAll(page, limit);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.giftCardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGiftCardDto: UpdateGiftCardDto) {
    return this.giftCardService.update(+id, updateGiftCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.giftCardService.remove(+id);
  }

  @Post('pay')
  payment(@Body() request:Request) {
    console.log(request);
    
    return this.giftCardService.pay(request);
  }


  // @Cron(CronExpression.EVERY_MINUTE)  
  // async checkScheduledEmails() {

  //   console.log('se ejecuta esta wea')
    
    // const emails = await this.emailRepository.find({
    //   where: { sent: false, scheduledDate: LessThanOrEqual(new Date()) },
    // });

    // for (const email of emails) {
    //   await this.emailService.sendEmail(email.to, email.subject, email.body);
    //   email.sent = true;
    //   await this.emailRepository.save(email);
    // }
  // }


}
