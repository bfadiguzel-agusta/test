import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto, req: any): Promise<import("../entities/task.entity").Task>;
    findAllByBoard(boardId: string, req: any): Promise<import("../entities/task.entity").Task[]>;
    getTasksByUser(req: any, projectId?: string): Promise<import("../entities/task.entity").Task[]>;
    findOne(id: string, req: any): Promise<import("../entities/task.entity").Task>;
    update(id: string, updateTaskDto: UpdateTaskDto, req: any): Promise<import("../entities/task.entity").Task>;
    remove(id: string, req: any): Promise<import("../entities/task.entity").Task>;
    moveTask(id: string, moveTaskDto: MoveTaskDto, req: any): Promise<import("../entities/task.entity").Task>;
}
