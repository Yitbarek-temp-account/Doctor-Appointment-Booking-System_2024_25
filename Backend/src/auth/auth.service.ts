import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model, ObjectId } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { user } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(user.name)
    private userModel: Model<user>,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string; roles: string[] ;id: ObjectId }> {
    const { email, password } = signUpDto;

    let roles = ['user']; // Default role

    // Check if the credentials match the admin credentials
    if (email === process.env.ADMIN_EMAIL) {
      const isPasswordMatched = await bcrypt.compare(
        password,
        process.env.ADMIN_PASSWORD_HASH
      );
      if (isPasswordMatched) {
        roles = ['admin']; // Assign admin role
      } else {
        throw new UnauthorizedException('Invalid credentials for admin signup.');
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      ...signUpDto,
      password: hashedPassword,
      roles,
    });

    const token = this.jwtService.sign({ id: newUser._id, roles: newUser.roles,  });

    return { token, roles: newUser.roles, id: newUser._id };
  }

  async login(loginDto: LoginDto): Promise<{ token: string; roles: string[];id: ObjectId }> {
    const { email, password } = loginDto;

    // Check if the user is the admin
    if (email === process.env.ADMIN_EMAIL) {
      if (await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)) {
        // Assuming the admin user exists in the database and has the role 'admin'
        const adminUser = await this.userModel.findOne({ email }).exec();
        if (!adminUser) {
          throw new UnauthorizedException('Admin user does not exist in the database.');
        }

        const adminToken = this.jwtService.sign({ id: adminUser._id, roles: adminUser.roles });
        return { token: adminToken, roles: adminUser.roles,id: adminUser._id  };
      } else {
        throw new UnauthorizedException('Invalid email or password.');
      }
    }

    // Handle regular user login
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const token = this.jwtService.sign({ id: user._id, roles: user.roles });
    return { token, roles: user.roles, id:user._id };
  }
}
