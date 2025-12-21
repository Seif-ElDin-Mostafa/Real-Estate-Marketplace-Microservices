import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async register(registerDto: RegisterDto): Promise<User> {
        const { username, password, role, email, phone } = registerDto;

        // Check if user already exists
        const existingUser = await this.userModel.findOne({
            $or: [{ username }, { email }, { phone }],
        });

        if (existingUser) {
            throw new ConflictException('Username, email, or phone number already in use');
        }

        // Hash password
        const hashedPassword = await this.hashPassword(password);

        // Create user
        const user = new this.userModel({
            username,
            password: hashedPassword,
            role,
            email,
            phone,
        });

        return user.save();
    }

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.userModel.findOne({ username });
        if (!user) {
            return null;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return null;
        }

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find({});
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async delete(id: string): Promise<void> {
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
    }

    async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<void> {
        const { currentPassword, newPassword } = changePasswordDto;

        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Current password is incorrect');
        }

        const hashedNewPassword = await this.hashPassword(newPassword);
        user.password = hashedNewPassword;
        await user.save();
    }
}
