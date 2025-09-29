import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { Board } from '../entities/board.entity';
import { User } from '../entities/user.entity';
import { ProjectsService } from '../projects/projects.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
export declare class TasksService {
    private taskRepository;
    private boardRepository;
    private userRepository;
    private projectsService;
    constructor(taskRepository: Repository<Task>, boardRepository: Repository<Board>, userRepository: Repository<User>, projectsService: ProjectsService);
    create(createTaskDto: CreateTaskDto, userId: string): Promise<Task>;
    findAllByBoard(boardId: string, userId: string): Promise<Task[]>;
    findOne(id: string, userId: string): Promise<Task>;
    update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task>;
    remove(id: string, userId: string): Promise<Task>;
    moveTask(id: string, moveTaskDto: MoveTaskDto, userId: string): Promise<Task>;
    private reorderTasksInBoard;
    getTasksByUser(userId: string, projectId?: string): Promise<Task[]>;
}
