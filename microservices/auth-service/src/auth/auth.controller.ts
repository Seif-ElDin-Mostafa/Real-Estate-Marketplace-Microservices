import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from '../users/dto/register.dto';
import { LoginDto } from '../users/dto/login.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { ChangePasswordDto } from '../users/dto/change-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    async getUser(@Request() req) {
        if (req.user.role === 'admin') {
            const users = await this.usersService.findAll();
            return {
                success: true,
                data: users,
                message: 'Users Found',
                error: null
            };
        }

        const user = await this.usersService.findById(req.user.id);
        return {
            success: true,
            data: user,
            message: 'User Found',
            error: null
        };
    }

    @UseGuards(JwtAuthGuard)
    @Put('me')
    async updateMe(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        const user = await this.usersService.update(req.user.id, updateUserDto);
        return {
            success: true,
            data: user,
            message: 'User Updated',
            error: null
        };
    }

    @UseGuards(JwtAuthGuard)
    @Put('user/:id')
    async updateUser(@Request() req, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        if (req.user.role !== 'admin') {
            return { success: false, message: 'Forbidden', statusCode: 403 };
        }

        const user = await this.usersService.update(id, updateUserDto);
        return {
            success: true,
            data: user,
            message: 'User Updated',
            error: null
        };
    }

    @UseGuards(JwtAuthGuard)
    @Delete('user/:id')
    async deleteUser(@Request() req, @Param('id') id: string) {
        if (req.user.role !== 'admin') {
            return { success: false, message: 'Forbidden', statusCode: 403 };
        }

        await this.usersService.delete(id);
        return {
            success: true,
            data: null,
            message: 'User Deleted',
            error: null
        };
    }

    @UseGuards(JwtAuthGuard)
    @Delete('me')
    async deleteMe(@Request() req) {
        await this.usersService.delete(req.user.id);
        return {
            success: true,
            data: null,
            message: 'User Deleted',
            error: null
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('change-password')
    async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
        await this.usersService.changePassword(req.user.id, changePasswordDto);
        return {
            success: true,
            data: null,
            message: 'Password changed successfully',
            error: null
        };
    }
}
