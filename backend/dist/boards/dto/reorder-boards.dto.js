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
exports.ReorderBoardsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ReorderBoardsDto {
}
exports.ReorderBoardsDto = ReorderBoardsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['uuid1', 'uuid2', 'uuid3'],
        description: 'Yeni sıralamada pano ID\'leri'
    }),
    (0, class_validator_1.IsArray)({ message: 'Board ID\'leri dizi olmalıdır' }),
    (0, class_validator_1.IsUUID)('4', { each: true, message: 'Geçerli UUID\'ler giriniz' }),
    __metadata("design:type", Array)
], ReorderBoardsDto.prototype, "boardIds", void 0);
//# sourceMappingURL=reorder-boards.dto.js.map