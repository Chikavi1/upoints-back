import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
 

@Controller('stripe')
export class StripeController {

    constructor(private stripeService: StripeService){}
    

    @Get('webhook')
    async webhook(@Body() body: any) {
      console.log('hola mundo');
    //   return this.stripeService.handleWebhook(body);
    }


  @Post('create-customer')
  async createCustomer(@Body() body: { email: string; name: string }) {
    try {
        const { email, name } = body;
        return this.stripeService.createCustomer(email, name);
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
        
    }
  }

   @Get('customer/:id')
  async getCustomer(@Param('id') id: string) {
    return this.stripeService.retrieveCustomer(id);
  }
 
}
