//jwt.startegy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { user } from './schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(
    @InjectModel('user')
    private userModel: Model<user & Document>, // Include Document in the type
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<any> {
    const { id } = payload;

    const user = await this.userModel.findById(id).select('+roles');
    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }

    // Use type assertion to inform TypeScript about the shape of the user object
    const userObject = user.toObject() as user & { roles: string[] };

    return userObject;
  }
}