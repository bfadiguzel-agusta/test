import { Board } from './board.entity';
import { User } from './user.entity';
export declare enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    TESTING = "testing",
    DONE = "done"
}
export declare enum TaskPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent"
}
export declare class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    boardId: string;
    assigneeId: string;
    createdById: string;
    order: number;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    board: Board;
    assignee: User;
    createdBy: User;
}
