import { Project } from './project.entity';
import { Task } from './task.entity';
export declare class Board {
    id: string;
    name: string;
    description: string;
    projectId: string;
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    project: Project;
    tasks: Task[];
}
