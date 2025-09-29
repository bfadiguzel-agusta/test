"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("../entities/task.entity");
const board_entity_1 = require("../entities/board.entity");
const user_entity_1 = require("../entities/user.entity");
const projects_service_1 = require("../projects/projects.service");
const project_user_entity_1 = require("../entities/project-user.entity");
let TasksService = class TasksService {
    constructor(taskRepository, boardRepository, userRepository, projectsService) {
        this.taskRepository = taskRepository;
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
        this.projectsService = projectsService;
    }
    async create(createTaskDto, userId) {
        const board = await this.boardRepository.findOne({
            where: { id: createTaskDto.boardId, isActive: true },
            relations: ['project'],
        });
        if (!board) {
            throw new common_1.NotFoundException('Pano bulunamadı');
        }
        const userRole = await this.projectsService.getUserProjectRole(board.project.id, userId);
        if (!userRole || userRole === project_user_entity_1.ProjectRole.VIEWER) {
            throw new common_1.ForbiddenException('Bu panoya görev ekleme yetkiniz yok');
        }
        if (createTaskDto.assigneeId) {
            const assigneeRole = await this.projectsService.getUserProjectRole(board.project.id, createTaskDto.assigneeId);
            if (!assigneeRole) {
                throw new common_1.ForbiddenException('Atanan kullanıcı bu projeye erişimi yok');
            }
        }
        const lastTask = await this.taskRepository.findOne({
            where: { boardId: createTaskDto.boardId },
            order: { order: 'DESC' },
        });
        const task = this.taskRepository.create({
            ...createTaskDto,
            createdById: userId,
            order: lastTask ? lastTask.order + 1 : 0,
        });
        return this.taskRepository.save(task);
    }
    async findAllByBoard(boardId, userId) {
        const board = await this.boardRepository.findOne({
            where: { id: boardId, isActive: true },
            relations: ['project'],
        });
        if (!board) {
            throw new common_1.NotFoundException('Pano bulunamadı');
        }
        const userRole = await this.projectsService.getUserProjectRole(board.project.id, userId);
        if (!userRole) {
            throw new common_1.ForbiddenException('Bu panoya erişim yetkiniz yok');
        }
        return this.taskRepository.find({
            where: { boardId },
            order: { order: 'ASC' },
            relations: ['assignee', 'createdBy'],
        });
    }
    async findOne(id, userId) {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: ['board', 'board.project', 'assignee', 'createdBy'],
        });
        if (!task) {
            throw new common_1.NotFoundException('Görev bulunamadı');
        }
        const userRole = await this.projectsService.getUserProjectRole(task.board.project.id, userId);
        if (!userRole) {
            throw new common_1.ForbiddenException('Bu göreve erişim yetkiniz yok');
        }
        return task;
    }
    async update(id, updateTaskDto, userId) {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: ['board', 'board.project'],
        });
        if (!task) {
            throw new common_1.NotFoundException('Görev bulunamadı');
        }
        const userRole = await this.projectsService.getUserProjectRole(task.board.project.id, userId);
        if (!userRole || userRole === project_user_entity_1.ProjectRole.VIEWER) {
            throw new common_1.ForbiddenException('Bu görevi düzenleme yetkiniz yok');
        }
        if (updateTaskDto.assigneeId) {
            const assigneeRole = await this.projectsService.getUserProjectRole(task.board.project.id, updateTaskDto.assigneeId);
            if (!assigneeRole) {
                throw new common_1.ForbiddenException('Atanan kullanıcı bu projeye erişimi yok');
            }
        }
        Object.assign(task, updateTaskDto);
        return this.taskRepository.save(task);
    }
    async remove(id, userId) {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: ['board', 'board.project'],
        });
        if (!task) {
            throw new common_1.NotFoundException('Görev bulunamadı');
        }
        const userRole = await this.projectsService.getUserProjectRole(task.board.project.id, userId);
        if (!userRole || userRole === project_user_entity_1.ProjectRole.VIEWER) {
            throw new common_1.ForbiddenException('Bu görevi silme yetkiniz yok');
        }
        return this.taskRepository.remove(task);
    }
    async moveTask(id, moveTaskDto, userId) {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: ['board', 'board.project'],
        });
        if (!task) {
            throw new common_1.NotFoundException('Görev bulunamadı');
        }
        const targetBoard = await this.boardRepository.findOne({
            where: { id: moveTaskDto.targetBoardId, isActive: true },
            relations: ['project'],
        });
        if (!targetBoard) {
            throw new common_1.NotFoundException('Hedef pano bulunamadı');
        }
        const sourceProjectRole = await this.projectsService.getUserProjectRole(task.board.project.id, userId);
        const targetProjectRole = await this.projectsService.getUserProjectRole(targetBoard.project.id, userId);
        if (!sourceProjectRole || sourceProjectRole === project_user_entity_1.ProjectRole.VIEWER ||
            !targetProjectRole || targetProjectRole === project_user_entity_1.ProjectRole.VIEWER) {
            throw new common_1.ForbiddenException('Görevi taşıma yetkiniz yok');
        }
        if (moveTaskDto.targetBoardId !== task.boardId) {
            task.boardId = moveTaskDto.targetBoardId;
            const lastTaskInTarget = await this.taskRepository.findOne({
                where: { boardId: moveTaskDto.targetBoardId },
                order: { order: 'DESC' },
            });
            task.order = lastTaskInTarget ? lastTaskInTarget.order + 1 : 0;
        }
        if (moveTaskDto.status) {
            task.status = moveTaskDto.status;
        }
        if (moveTaskDto.newOrder !== undefined) {
            task.order = moveTaskDto.newOrder;
            await this.reorderTasksInBoard(task.boardId, task.id, moveTaskDto.newOrder);
        }
        return this.taskRepository.save(task);
    }
    async reorderTasksInBoard(boardId, movedTaskId, newOrder) {
        const tasks = await this.taskRepository.find({
            where: { boardId },
            order: { order: 'ASC' },
        });
        const movedTaskIndex = tasks.findIndex(t => t.id === movedTaskId);
        if (movedTaskIndex > -1) {
            tasks.splice(movedTaskIndex, 1);
        }
        for (let i = 0; i < tasks.length; i++) {
            if (i >= newOrder) {
                tasks[i].order = i + 1;
            }
            else {
                tasks[i].order = i;
            }
            await this.taskRepository.save(tasks[i]);
        }
    }
    async getTasksByUser(userId, projectId) {
        const queryBuilder = this.taskRepository
            .createQueryBuilder('task')
            .leftJoinAndSelect('task.board', 'board')
            .leftJoinAndSelect('board.project', 'project')
            .leftJoinAndSelect('task.assignee', 'assignee')
            .leftJoinAndSelect('task.createdBy', 'createdBy')
            .where('task.assigneeId = :userId', { userId });
        if (projectId) {
            queryBuilder.andWhere('project.id = :projectId', { projectId });
        }
        return queryBuilder
            .orderBy('task.createdAt', 'DESC')
            .getMany();
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_1.InjectRepository)(board_entity_1.Board)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        projects_service_1.ProjectsService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map