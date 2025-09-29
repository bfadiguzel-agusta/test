import { UserRole } from '../../entities/user.entity';
export declare class RegisterDto {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role?: UserRole;
}
