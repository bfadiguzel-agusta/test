import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(currentUserId: string): Promise<User[]>;
    findOne(id: string, currentUserId: string): Promise<User>;
    updateUserRole(userId: string, newRole: UserRole, currentUserId: string): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: UserRole;
    }>;
    deactivateUser(userId: string, currentUserId: string): Promise<{
        message: string;
    }>;
    searchUsers(query: string, currentUserId: string): Promise<User[]>;
}
