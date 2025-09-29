import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
        role: import("../entities/user.entity").UserRole;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        projectUsers: import("../entities/project-user.entity").ProjectUser[];
        assignedTasks: import("../entities/task.entity").Task[];
        createdTasks: import("../entities/task.entity").Task[];
    }>;
    getProfile(req: any): any;
}
