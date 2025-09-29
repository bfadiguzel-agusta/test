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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tasks_service_1 = require("./tasks.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const move_task_dto_1 = require("./dto/move-task.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    create(createTaskDto, req) {
        return this.tasksService.create(createTaskDto, req.user.id);
    }
    findAllByBoard(boardId, req) {
        return this.tasksService.findAllByBoard(boardId, req.user.id);
    }
    getTasksByUser(req, projectId) {
        return this.tasksService.getTasksByUser(req.user.id, projectId);
    }
    findOne(id, req) {
        return this.tasksService.findOne(id, req.user.id);
    }
    update(id, updateTaskDto, req) {
        return this.tasksService.update(id, updateTaskDto, req.user.id);
    }
    remove(id, req) {
        return this.tasksService.remove(id, req.user.id);
    }
    moveTask(id, moveTaskDto, req) {
        return this.tasksService.moveTask(id, moveTaskDto, req.user.id);
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Yeni görev oluştur' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Panoya ait görevleri listele' }),
    (0, common_1.Get)('board/:boardId'),
    __param(0, (0, common_1.Param)('boardId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findAllByBoard", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Kullanıcıya atanan görevleri listele' }),
    (0, swagger_1.ApiQuery)({ name: 'projectId', required: false }),
    (0, common_1.Get)('user/assigned'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getTasksByUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Görev detayı' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Görev güncelle' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_dto_1.UpdateTaskDto, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Görev sil' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Görevi taşı (drag & drop)' }),
    (0, common_1.Put)(':id/move'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, move_task_dto_1.MoveTaskDto, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "moveTask", null);
exports.TasksController = TasksController = __decorate([
    (0, swagger_1.ApiTags)('Tasks'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map