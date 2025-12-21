import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from '../users/dto/register.dto';
import { LoginDto } from '../users/dto/login.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { ChangePasswordDto } from '../users/dto/change-password.dto';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
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
    getUser(req: any): Promise<{
        success: boolean;
        data: import("../users/schemas/user.schema").User[];
        message: string;
        error: null;
    } | {
        success: boolean;
        data: import("../users/schemas/user.schema").User;
        message: string;
        error: null;
    }>;
    updateMe(req: any, updateUserDto: UpdateUserDto): Promise<{
        success: boolean;
        data: import("../users/schemas/user.schema").User;
        message: string;
        error: null;
    }>;
    updateUser(req: any, id: string, updateUserDto: UpdateUserDto): Promise<{
        success: boolean;
        message: string;
        statusCode: number;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        data: import("../users/schemas/user.schema").User;
        message: string;
        error: null;
        statusCode?: undefined;
    }>;
    deleteUser(req: any, id: string): Promise<{
        success: boolean;
        message: string;
        statusCode: number;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        data: null;
        message: string;
        error: null;
        statusCode?: undefined;
    }>;
    deleteMe(req: any): Promise<{
        success: boolean;
        data: null;
        message: string;
        error: null;
    }>;
    changePassword(req: any, changePasswordDto: ChangePasswordDto): Promise<{
        success: boolean;
        data: null;
        message: string;
        error: null;
    }>;
}
