import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm'
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: await bcrypt.hash(password, 10)
      });
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.hadleDBExceptions(error);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
      const { email, password } = loginUserDto;
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if(!user.isActive){
        throw new UnauthorizedException('User is inactive, talk with an admin');
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const { password: _, ...userNoPassword } = user;
      return {
        ...userNoPassword,
        token: this.getJwtToken({ email: user.email, id: user.id }),
      };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private hadleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
  }
}
