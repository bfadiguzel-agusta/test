import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AssignUserDto } from './dto/assign-user.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto, req: any): Promise<import("../entities/project.entity").Project>;
    findAll(req: any): Promise<import("../entities/project.entity").Project[]>;
    findOne(id: string, req: any): Promise<import("../entities/project.entity").Project>;
    update(id: string, updateProjectDto: UpdateProjectDto, req: any): Promise<import("../entities/project.entity").Project>;
    remove(id: string, req: any): Promise<import("../entities/project.entity").Project>;
    assignUser(id: string, assignUserDto: AssignUserDto, req: any): Promise<import("../entities/project-user.entity").ProjectUser>;
    removeUser(id: string, userId: string, req: any): Promise<{
        message: string;
    }>;
}
