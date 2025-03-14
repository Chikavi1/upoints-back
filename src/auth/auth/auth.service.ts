import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
 
  async generateToken(user: any): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }


  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }


  async validateUser(email: string, password: string): Promise<any> {
     const user = { email: email, password: await bcrypt.hash(password, 10) }; 
    if (user && (await bcrypt.compare(password, user.password))) {
       return { email: user.email };
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  async login(user: any) {
    const payload = { email: user.email };
    console.log( this.jwtService.sign(payload))
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}