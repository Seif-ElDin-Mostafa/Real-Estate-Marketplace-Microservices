import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from '../users/dto/login.dto';
import { RegisterDto } from '../users/dto/register.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        success: boolean;
        data: import("../users/schemas/user.schema").User;
        message: string;
        error: null;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        role: string;
    }>;
    validateToken(token: string): Promise<any>;
}
