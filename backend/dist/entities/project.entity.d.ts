import { ProjectUser } from './project-user.entity';
import { Board } from './board.entity';
export declare class Project {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    projectUsers: ProjectUser[];
    boards: Board[];
}
