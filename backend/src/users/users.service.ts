import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(currentUserId: string) {
    const currentUser = await this.userRepository.findOne({
      where: { id: currentUserId },
    });

    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Sadece yöneticiler kullanıcıları listeleyebilir');
    }

    return this.userRepository.find({
      where: { isActive: true },
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'createdAt'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, currentUserId: string) {
    const currentUser = await this.userRepository.findOne({
      where: { id: currentUserId },
    });

    // Kendi profilini görebilir veya admin tüm profilleri görebilir
    if (currentUser.role !== UserRole.ADMIN && currentUserId !== id) {
      throw new ForbiddenException('Bu kullanıcının profilini görme yetkiniz yok');
    }

    return this.userRepository.findOne({
      where: { id, isActive: true },
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'createdAt'],
    });
  }

  async updateUserRole(userId: string, newRole: UserRole, currentUserId: string) {
    const currentUser = await this.userRepository.findOne({
      where: { id: currentUserId },
    });

    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Sadece yöneticiler kullanıcı rollerini değiştirebilir');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId, isActive: true },
    });

    if (!user) {
      throw new ForbiddenException('Kullanıcı bulunamadı');
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

  async deactivateUser(userId: string, currentUserId: string) {
    const currentUser = await this.userRepository.findOne({
      where: { id: currentUserId },
    });

    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Sadece yöneticiler kullanıcıları deaktive edebilir');
    }

    if (userId === currentUserId) {
      throw new ForbiddenException('Kendi hesabınızı deaktive edemezsiniz');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new ForbiddenException('Kullanıcı bulunamadı');
    }

    user.isActive = false;
    await this.userRepository.save(user);

    return { message: 'Kullanıcı deaktive edildi' };
  }

  async searchUsers(query: string, currentUserId: string) {
    const currentUser = await this.userRepository.findOne({
      where: { id: currentUserId },
    });

    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Sadece yöneticiler kullanıcı arayabilir');
    }

    return this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.firstName', 'user.lastName', 'user.role'])
      .where('user.isActive = :isActive', { isActive: true })
      .andWhere(
        '(LOWER(user.firstName) LIKE LOWER(:query) OR LOWER(user.lastName) LIKE LOWER(:query) OR LOWER(user.email) LIKE LOWER(:query))',
        { query: `%${query}%` },
      )
      .orderBy('user.firstName', 'ASC')
      .getMany();
  }
}
