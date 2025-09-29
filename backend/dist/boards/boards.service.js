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
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const board_entity_1 = require("../entities/board.entity");
const project_entity_1 = require("../entities/project.entity");
const projects_service_1 = require("../projects/projects.service");
const project_user_entity_1 = require("../entities/project-user.entity");
let BoardsService = class BoardsService {
    constructor(boardRepository, projectRepository, projectsService) {
        this.boardRepository = boardRepository;
        this.projectRepository = projectRepository;
        this.projectsService = projectsService;
    }
    async create(createBoardDto, userId) {
        const userRole = await this.projectsService.getUserProjectRole(createBoardDto.projectId, userId);
        if (!userRole || userRole === project_user_entity_1.ProjectRole.VIEWER) {
            throw new common_1.ForbiddenException('Bu projeye pano ekleme yetkiniz yok');
        }
        const project = await this.projectRepository.findOne({
            where: { id: createBoardDto.projectId, isActive: true },
        });
        if (!project) {
            throw new common_1.NotFoundException('Proje bulunamadı');
        }
        const lastBoard = await this.boardRepository.findOne({
            where: { projectId: createBoardDto.projectId },
            order: { order: 'DESC' },
        });
        const board = this.boardRepository.create({
            ...createBoardDto,
            order: lastBoard ? lastBoard.order + 1 : 0,
        });
        return this.boardRepository.save(board);
    }
    async findAllByProject(projectId, userId) {
        const userRole = await this.projectsService.getUserProjectRole(projectId, userId);
        if (!userRole) {
            throw new common_1.ForbiddenException('Bu projeye erişim yetkiniz yok');
        }
        return this.boardRepository.find({
            where: { projectId, isActive: true },
            order: { order: 'ASC' },
            relations: ['tasks', 'tasks.assignee'],
        });
    }
    async findOne(id, userId) {
        const board = await this.boardRepository.findOne({
            where: { id, isActive: true },
            relations: ['project', 'tasks', 'tasks.assignee', 'tasks.createdBy'],
        });
        if (!board) {
            throw new common_1.NotFoundException('Pano bulunamadı');
        }
        const userRole = await this.projectsService.getUserProjectRole(board.projectId, userId);
        if (!userRole) {
            throw new common_1.ForbiddenException('Bu panoya erişim yetkiniz yok');
        }
        return board;
    }
    async update(id, updateBoardDto, userId) {
        const board = await this.boardRepository.findOne({
            where: { id, isActive: true },
        });
        if (!board) {
            throw new common_1.NotFoundException('Pano bulunamadı');
        }
        const userRole = await this.projectsService.getUserProjectRole(board.projectId, userId);
        if (!userRole || userRole === project_user_entity_1.ProjectRole.VIEWER) {
            throw new common_1.ForbiddenException('Bu panoyu düzenleme yetkiniz yok');
        }
        Object.assign(board, updateBoardDto);
        return this.boardRepository.save(board);
    }
    async remove(id, userId) {
        const board = await this.boardRepository.findOne({
            where: { id, isActive: true },
        });
        if (!board) {
            throw new common_1.NotFoundException('Pano bulunamadı');
        }
        const userRole = await this.projectsService.getUserProjectRole(board.projectId, userId);
        if (!userRole || userRole === project_user_entity_1.ProjectRole.VIEWER) {
            throw new common_1.ForbiddenException('Bu panoyu silme yetkiniz yok');
        }
        board.isActive = false;
        return this.boardRepository.save(board);
    }
    async reorderBoards(projectId, boardIds, userId) {
        const userRole = await this.projectsService.getUserProjectRole(projectId, userId);
        if (!userRole || userRole === project_user_entity_1.ProjectRole.VIEWER) {
            throw new common_1.ForbiddenException('Pano sıralamasını değiştirme yetkiniz yok');
        }
        const boards = await this.boardRepository.find({
            where: { projectId, isActive: true },
        });
        const projectBoardIds = boards.map(b => b.id);
        const invalidIds = boardIds.filter(id => !projectBoardIds.includes(id));
        if (invalidIds.length > 0) {
            throw new common_1.ForbiddenException('Geçersiz pano ID\'leri');
        }
        for (let i = 0; i < boardIds.length; i++) {
            await this.boardRepository.update(boardIds[i], { order: i });
        }
        return { message: 'Pano sıralaması güncellendi' };
    }
};
exports.BoardsService = BoardsService;
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_entity_1.Board)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        projects_service_1.ProjectsService])
], BoardsService);
//# sourceMappingURL=boards.service.js.map