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
exports.BoardsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const boards_service_1 = require("./boards.service");
const create_board_dto_1 = require("./dto/create-board.dto");
const update_board_dto_1 = require("./dto/update-board.dto");
const reorder_boards_dto_1 = require("./dto/reorder-boards.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let BoardsController = class BoardsController {
    constructor(boardsService) {
        this.boardsService = boardsService;
    }
    create(createBoardDto, req) {
        return this.boardsService.create(createBoardDto, req.user.id);
    }
    findAllByProject(projectId, req) {
        return this.boardsService.findAllByProject(projectId, req.user.id);
    }
    findOne(id, req) {
        return this.boardsService.findOne(id, req.user.id);
    }
    update(id, updateBoardDto, req) {
        return this.boardsService.update(id, updateBoardDto, req.user.id);
    }
    remove(id, req) {
        return this.boardsService.remove(id, req.user.id);
    }
    reorderBoards(projectId, reorderBoardsDto, req) {
        return this.boardsService.reorderBoards(projectId, reorderBoardsDto.boardIds, req.user.id);
    }
};
exports.BoardsController = BoardsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Yeni pano oluştur' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_board_dto_1.CreateBoardDto, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Projeye ait panoları listele' }),
    (0, common_1.Get)('project/:projectId'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "findAllByProject", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Pano detayı' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Pano güncelle' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_board_dto_1.UpdateBoardDto, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Pano sil' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Pano sıralamasını güncelle' }),
    (0, common_1.Put)('project/:projectId/reorder'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reorder_boards_dto_1.ReorderBoardsDto, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "reorderBoards", null);
exports.BoardsController = BoardsController = __decorate([
    (0, swagger_1.ApiTags)('Boards'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('boards'),
    __metadata("design:paramtypes", [boards_service_1.BoardsService])
], BoardsController);
//# sourceMappingURL=boards.controller.js.map