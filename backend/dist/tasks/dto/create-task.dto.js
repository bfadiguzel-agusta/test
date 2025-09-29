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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const task_entity_1 = require("../../entities/task.entity");
class CreateTaskDto {
}
exports.CreateTaskDto = CreateTaskDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Login sayfası tasarımı' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Görev başlığı boş olamaz' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Kullanıcı giriş sayfası için modern tasarım', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: task_entity_1.TaskStatus, example: task_entity_1.TaskStatus.TODO }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(task_entity_1.TaskStatus, { message: 'Geçerli bir görev durumu seçiniz' }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: task_entity_1.TaskPriority, example: task_entity_1.TaskPriority.MEDIUM }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(task_entity_1.TaskPriority, { message: 'Geçerli bir öncelik seçiniz' }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-board' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Pano ID boş olamaz' }),
    (0, class_validator_1.IsUUID)('4', { message: 'Geçerli bir pano ID giriniz' }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "boardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-user', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'Geçerli bir kullanıcı ID giriniz' }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "assigneeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-12-31', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Geçerli bir tarih giriniz' }),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "dueDate", void 0);
//# sourceMappingURL=create-task.dto.js.map