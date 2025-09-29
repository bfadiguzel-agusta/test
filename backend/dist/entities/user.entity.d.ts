import { ProjectUser } from './project-user.entity';
import { Task } from './task.entity';
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export declare class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    projectUsers: ProjectUser[];
    assignedTasks: Task[];
    createdTasks: Task[];
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}
