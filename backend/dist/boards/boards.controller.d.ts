import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ReorderBoardsDto } from './dto/reorder-boards.dto';
export declare class BoardsController {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    create(createBoardDto: CreateBoardDto, req: any): Promise<import("../entities/board.entity").Board>;
    findAllByProject(projectId: string, req: any): Promise<import("../entities/board.entity").Board[]>;
    findOne(id: string, req: any): Promise<import("../entities/board.entity").Board>;
    update(id: string, updateBoardDto: UpdateBoardDto, req: any): Promise<import("../entities/board.entity").Board>;
    remove(id: string, req: any): Promise<import("../entities/board.entity").Board>;
    reorderBoards(projectId: string, reorderBoardsDto: ReorderBoardsDto, req: any): Promise<{
        message: string;
    }>;
}
