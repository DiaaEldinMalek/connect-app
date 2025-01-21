import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, _id: user._id };
    const access_token = this.jwtService.sign(payload);
    
    return {
      
      access_token: access_token,
    };
  }
  async validate_token(token: string){
    const body = this.jwtService.decode(token);
    const existing_user = await this.userService.findById(body._id)
    if (!existing_user || existing_user.username != body.username) {throw new UnauthorizedException()}
    
    const current_time = Math.floor(new Date().getTime() / 1000)
    
    if (body.exp <=current_time) {throw new UnauthorizedException("Token expired")} 
    Logger.log("Valid token")
  }


}

