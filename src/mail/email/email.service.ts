import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
     this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'chikavi10@gmail.com',  
        pass: 'zvcvhasrrwduwmzd',        
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const mailOptions = {
      from: '"UPoints" <chikavi10@gmail.com>',  
      to,                                    
      subject,                               
      text,                                  
      html,                                  
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado: ', info.messageId);
      return info;
    } catch (error) {
      console.error('Error al enviar el correo: ', error);
      throw error;
    }
  }
}
