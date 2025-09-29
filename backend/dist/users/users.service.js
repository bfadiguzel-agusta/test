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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll(currentUserId) {
        const currentUser = await this.userRepository.findOne({
            where: { id: currentUserId },
        });
        if (currentUser.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Sadece yöneticiler kullanıcıları listeleyebilir');
        }
        return this.userRepository.find({
            where: { isActive: true },
            select: ['id', 'email', 'firstName', 'lastName', 'role', 'createdAt'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id, currentUserId) {
        const currentUser = await this.userRepository.findOne({
            where: { id: currentUserId },
        });
        if (currentUser.role !== user_entity_1.UserRole.ADMIN && currentUserId !== id) {
            throw new common_1.ForbiddenException('Bu kullanıcının profilini görme yetkiniz yok');
        }
        return this.userRepository.findOne({
            where: { id, isActive: true },
            select: ['id', 'email', 'firstName', 'lastName', 'role', 'createdAt'],
        });
    }
    async updateUserRole(userId, newRole, currentUserId) {
        const currentUser = await this.userRepository.findOne({
            where: { id: currentUserId },
        });
        if (currentUser.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Sadece yöneticiler kullanıcı rollerini değiştirebilir');
        }
        const user = await this.userRepository.findOne({
            where: { id: userId, isActive: true },
        });
        if (!user) {
            throw new common_1.ForbiddenException('Kullanıcı bulunamadı');
        }
        user.role = newRole;
        await this.userRepository.save(user);
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        };
    }
    async deactivateUser(userId, currentUserId) {
        const currentUser = await this.userRepository.findOne({
            where: { id: currentUserId },
        });
        if (currentUser.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Sadece yöneticiler kullanıcıları deaktive edebilir');
        }
        if (userId === currentUserId) {
            throw new common_1.ForbiddenException('Kendi hesabınızı deaktive edemezsiniz');
        }
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.ForbiddenException('Kullanıcı bulunamadı');
        }
        user.isActive = false;
        await this.userRepository.save(user);
        return { message: 'Kullanıcı deaktive edildi' };
    }
    async searchUsers(query, currentUserId) {
        const currentUser = await this.userRepository.findOne({
            where: { id: currentUserId },
        });
        if (currentUser.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Sadece yöneticiler kullanıcı arayabilir');
        }
        return this.userRepository
            .createQueryBuilder('user')
            .select(['user.id', 'user.email', 'user.firstName', 'user.lastName', 'user.role'])
            .where('user.isActive = :isActive', { isActive: true })
            .andWhere('(LOWER(user.firstName) LIKE LOWER(:query) OR LOWER(user.lastName) LIKE LOWER(:query) OR LOWER(user.email) LIKE LOWER(:query))', { query: `%${query}%` })
            .orderBy('user.firstName', 'ASC')
            .getMany();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map