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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("../entities/project.entity");
const project_user_entity_1 = require("../entities/project-user.entity");
const user_entity_1 = require("../entities/user.entity");
let ProjectsService = class ProjectsService {
    constructor(projectRepository, projectUserRepository, userRepository) {
        this.projectRepository = projectRepository;
        this.projectUserRepository = projectUserRepository;
        this.userRepository = userRepository;
    }
    async create(createProjectDto, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Sadece yöneticiler proje oluşturabilir');
        }
        const project = this.projectRepository.create(createProjectDto);
        const savedProject = await this.projectRepository.save(project);
        const projectUser = this.projectUserRepository.create({
            projectId: savedProject.id,
            userId: userId,
            role: project_user_entity_1.ProjectRole.ADMIN,
        });
        await this.projectUserRepository.save(projectUser);
        return savedProject;
    }
    async findAll(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (user.role === user_entity_1.UserRole.ADMIN) {
            return this.projectRepository.find({
                where: { isActive: true },
                relations: ['projectUsers', 'projectUsers.user'],
            });
        }
        else {
            const projectUsers = await this.projectUserRepository.find({
                where: { userId },
                relations: ['project', 'project.projectUsers', 'project.projectUsers.user'],
            });
            return projectUsers
                .filter(pu => pu.project.isActive)
                .map(pu => pu.project);
        }
    }
    async findOne(id, userId) {
        await this.checkProjectAccess(id, userId);
        return this.projectRepository.findOne({
            where: { id, isActive: true },
            relations: ['projectUsers', 'projectUsers.user', 'boards'],
        });
    }
    async update(id, updateProjectDto, userId) {
        await this.checkProjectAccess(id, userId, [project_user_entity_1.ProjectRole.ADMIN]);
        const project = await this.projectRepository.findOne({ where: { id } });
        if (!project) {
            throw new common_1.NotFoundException('Proje bulunamadı');
        }
        Object.assign(project, updateProjectDto);
        return this.projectRepository.save(project);
    }
    async remove(id, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (user.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Sadece yöneticiler proje silebilir');
        }
        const project = await this.projectRepository.findOne({ where: { id } });
        if (!project) {
            throw new common_1.NotFoundException('Proje bulunamadı');
        }
        project.isActive = false;
        return this.projectRepository.save(project);
    }
    async assignUser(projectId, assignUserDto, adminUserId) {
        await this.checkProjectAccess(projectId, adminUserId, [project_user_entity_1.ProjectRole.ADMIN]);
        const user = await this.userRepository.findOne({
            where: { id: assignUserDto.userId }
        });
        if (!user) {
            throw new common_1.NotFoundException('Kullanıcı bulunamadı');
        }
        const existingAssignment = await this.projectUserRepository.findOne({
            where: { projectId, userId: assignUserDto.userId },
        });
        if (existingAssignment) {
            existingAssignment.role = assignUserDto.role;
            return this.projectUserRepository.save(existingAssignment);
        }
        else {
            const projectUser = this.projectUserRepository.create({
                projectId,
                userId: assignUserDto.userId,
                role: assignUserDto.role,
            });
            return this.projectUserRepository.save(projectUser);
        }
    }
    async removeUser(projectId, userId, adminUserId) {
        await this.checkProjectAccess(projectId, adminUserId, [project_user_entity_1.ProjectRole.ADMIN]);
        const projectUser = await this.projectUserRepository.findOne({
            where: { projectId, userId },
        });
        if (!projectUser) {
            throw new common_1.NotFoundException('Kullanıcı bu projede bulunamadı');
        }
        await this.projectUserRepository.remove(projectUser);
        return { message: 'Kullanıcı projeden çıkarıldı' };
    }
    async checkProjectAccess(projectId, userId, requiredRoles) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (user.role === user_entity_1.UserRole.ADMIN) {
            return true;
        }
        const projectUser = await this.projectUserRepository.findOne({
            where: { projectId, userId },
            relations: ['project'],
        });
        if (!projectUser || !projectUser.project.isActive) {
            throw new common_1.ForbiddenException('Bu projeye erişim yetkiniz yok');
        }
        if (requiredRoles && !requiredRoles.includes(projectUser.role)) {
            throw new common_1.ForbiddenException('Bu işlem için yetkiniz yok');
        }
        return true;
    }
    async getUserProjectRole(projectId, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (user.role === user_entity_1.UserRole.ADMIN) {
            return project_user_entity_1.ProjectRole.ADMIN;
        }
        const projectUser = await this.projectUserRepository.findOne({
            where: { projectId, userId },
        });
        return projectUser?.role || null;
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(project_user_entity_1.ProjectUser)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map