import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: UserRole;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        projectUsers: import("../entities/project-user.entity").ProjectUser[];
        assignedTasks: import("../entities/task.entity").Task[];
        createdTasks: import("../entities/task.entity").Task[];
    }>;
    findById(id: string): Promise<User>;
}
