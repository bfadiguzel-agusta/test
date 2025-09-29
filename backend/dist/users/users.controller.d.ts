import { UsersService } from './users.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(req: any): Promise<import("../entities/user.entity").User[]>;
    searchUsers(query: string, req: any): Promise<import("../entities/user.entity").User[]>;
    findOne(id: string, req: any): Promise<import("../entities/user.entity").User>;
    updateUserRole(id: string, updateUserRoleDto: UpdateUserRoleDto, req: any): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: import("../entities/user.entity").UserRole;
    }>;
    deactivateUser(id: string, req: any): Promise<{
        message: string;
    }>;
}
