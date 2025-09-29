import { Repository } from 'typeorm';
import { Board } from '../entities/board.entity';
import { Project } from '../entities/project.entity';
import { ProjectsService } from '../projects/projects.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
export declare class BoardsService {
    private boardRepository;
    private projectRepository;
    private projectsService;
    constructor(boardRepository: Repository<Board>, projectRepository: Repository<Project>, projectsService: ProjectsService);
    create(createBoardDto: CreateBoardDto, userId: string): Promise<Board>;
    findAllByProject(projectId: string, userId: string): Promise<Board[]>;
    findOne(id: string, userId: string): Promise<Board>;
    update(id: string, updateBoardDto: UpdateBoardDto, userId: string): Promise<Board>;
    remove(id: string, userId: string): Promise<Board>;
    reorderBoards(projectId: string, boardIds: string[], userId: string): Promise<{
        message: string;
    }>;
}
