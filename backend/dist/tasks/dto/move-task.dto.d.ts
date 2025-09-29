import { TaskStatus } from '../../entities/task.entity';
export declare class MoveTaskDto {
    targetBoardId: string;
    status?: TaskStatus;
    newOrder?: number;
}
