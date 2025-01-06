import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, 
  ) {}

  // Hash the password using bcrypt
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    return bcrypt.hash(password, salt); // Hash the password
  }

  // Validate the password against the stored hashed password
  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword); 
  }

  async login(loginDto: { username: string; password: string }) {
    // Find the user by username
    const user = await this.userRepository.findOne({
      where: { username: loginDto.username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.validatePassword(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate a JWT token with user details
    const token = jwt.sign(
      { username: user.username, role: user.role }, 
      process.env.JWT_SECRET || 'secret', 
      { expiresIn: '1h' },
    );

    return { token };
  }
}
