import { User } from './user.entity';
import { Project } from './project.entity';
export declare enum ProjectRole {
    ADMIN = "admin",
    DEVELOPER = "developer",
    VIEWER = "viewer"
}
export declare class ProjectUser {
    id: string;
    userId: string;
    projectId: string;
    role: ProjectRole;
    assignedAt: Date;
    user: User;
    project: Project;
}
