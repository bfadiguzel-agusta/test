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
exports.ProjectUser = exports.ProjectRole = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const project_entity_1 = require("./project.entity");
var ProjectRole;
(function (ProjectRole) {
    ProjectRole["ADMIN"] = "admin";
    ProjectRole["DEVELOPER"] = "developer";
    ProjectRole["VIEWER"] = "viewer";
})(ProjectRole || (exports.ProjectRole = ProjectRole = {}));
let ProjectUser = class ProjectUser {
};
exports.ProjectUser = ProjectUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProjectUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectUser.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectUser.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProjectRole,
        default: ProjectRole.VIEWER,
    }),
    __metadata("design:type", String)
], ProjectUser.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProjectUser.prototype, "assignedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.projectUsers, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], ProjectUser.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.projectUsers, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    __metadata("design:type", project_entity_1.Project)
], ProjectUser.prototype, "project", void 0);
exports.ProjectUser = ProjectUser = __decorate([
    (0, typeorm_1.Entity)('project_users')
], ProjectUser);
//# sourceMappingURL=project-user.entity.js.map