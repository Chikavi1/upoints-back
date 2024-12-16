import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Stripe from 'stripe';


@Injectable()

export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
    
    async createCustomer(email: string, name: string) {
    return this.stripe.customers.create({
      email,
      name,
    });
  }

  // Obtener la información de un cliente por ID
  async retrieveCustomer(customerId: string) {
    return this.stripe.customers.retrieve(customerId);
  }

    
  async createPaymentIntent(amount: number, currency: string) {
    return this.stripe.paymentIntents.create({
      amount,
      currency,
    });
  }
    

  async retrievePaymentIntent(id: string) {
    return this.stripe.paymentIntents.retrieve(id);
  }

    
    async createSubscription(customerId: string, priceId: string) {
        try {
            return await this.stripe.subscriptions.create({
                customer: customerId,
                items: [{ price: priceId }],
                payment_behavior: 'default_incomplete',
                expand: ['latest_invoice.payment_intent'], // Para obtener el PaymentIntent asociado
            });
        } catch (error) {
            throw new BadRequestException('Failed to create subscription', error.message);
        }
    }
    

    async cancelSubscription(subscriptionId: string) {
        try {
            return await this.stripe.subscriptions.cancel(subscriptionId);
        } catch (error) {
             throw new BadRequestException('Failed to cancel subscription', error.message);
    }
  }
 

}


