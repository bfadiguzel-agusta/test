import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { ProjectUser, ProjectRole } from '../entities/project-user.entity';
import { User } from '../entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AssignUserDto } from './dto/assign-user.dto';
export declare class ProjectsService {
    private projectRepository;
    private projectUserRepository;
    private userRepository;
    constructor(projectRepository: Repository<Project>, projectUserRepository: Repository<ProjectUser>, userRepository: Repository<User>);
    create(createProjectDto: CreateProjectDto, userId: string): Promise<Project>;
    findAll(userId: string): Promise<Project[]>;
    findOne(id: string, userId: string): Promise<Project>;
    update(id: string, updateProjectDto: UpdateProjectDto, userId: string): Promise<Project>;
    remove(id: string, userId: string): Promise<Project>;
    assignUser(projectId: string, assignUserDto: AssignUserDto, adminUserId: string): Promise<ProjectUser>;
    removeUser(projectId: string, userId: string, adminUserId: string): Promise<{
        message: string;
    }>;
    private checkProjectAccess;
    getUserProjectRole(projectId: string, userId: string): Promise<ProjectRole | null>;
}
