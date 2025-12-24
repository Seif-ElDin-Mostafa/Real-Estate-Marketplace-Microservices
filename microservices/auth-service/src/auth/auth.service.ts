import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from '../users/dto/login.dto';
import { RegisterDto } from '../users/dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        const user = await this.usersService.register(registerDto);
        return {
            success: true,
            data: user,
            message: 'User Registered',
            error: null,
        };
    }

    async login(loginDto: LoginDto) {
        const { username, password } = loginDto;

        const user = await this.usersService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        const payload = {
            id: user['_id'].toString(),
            username: user.username,
            role: user.role
        };
        const token = this.jwtService.sign(payload);

        return {
            token,
            userId: user['_id'].toString(),
            role: user.role,
        };
    }

    async validateToken(token: string) {
        try {
            const payload = this.jwtService.verify(token);
            return payload;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
