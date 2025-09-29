import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { ProjectUser, ProjectRole } from '../entities/project-user.entity';
import { User, UserRole } from '../entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AssignUserDto } from './dto/assign-user.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(ProjectUser)
    private projectUserRepository: Repository<ProjectUser>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Sadece yöneticiler proje oluşturabilir');
    }

    const project = this.projectRepository.create(createProjectDto);
    const savedProject = await this.projectRepository.save(project);

    // Proje oluşturanı admin olarak ekle
    const projectUser = this.projectUserRepository.create({
      projectId: savedProject.id,
      userId: userId,
      role: ProjectRole.ADMIN,
    });
    await this.projectUserRepository.save(projectUser);

    return savedProject;
  }

  async findAll(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (user.role === UserRole.ADMIN) {
      // Admin tüm projeleri görebilir
      return this.projectRepository.find({
        where: { isActive: true },
        relations: ['projectUsers', 'projectUsers.user'],
      });
    } else {
      // Normal kullanıcı sadece atandığı projeleri görebilir
      const projectUsers = await this.projectUserRepository.find({
        where: { userId },
        relations: ['project', 'project.projectUsers', 'project.projectUsers.user'],
      });
      
      return projectUsers
        .filter(pu => pu.project.isActive)
        .map(pu => pu.project);
    }
  }

  async findOne(id: string, userId: string) {
    await this.checkProjectAccess(id, userId);
    
    return this.projectRepository.findOne({
      where: { id, isActive: true },
      relations: ['projectUsers', 'projectUsers.user', 'boards'],
    });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, userId: string) {
    await this.checkProjectAccess(id, userId, [ProjectRole.ADMIN]);
    
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException('Proje bulunamadı');
    }

    Object.assign(project, updateProjectDto);
    return this.projectRepository.save(project);
  }

  async remove(id: string, userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Sadece yöneticiler proje silebilir');
    }

    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException('Proje bulunamadı');
    }

    project.isActive = false;
    return this.projectRepository.save(project);
  }

  async assignUser(projectId: string, assignUserDto: AssignUserDto, adminUserId: string) {
    await this.checkProjectAccess(projectId, adminUserId, [ProjectRole.ADMIN]);

    const user = await this.userRepository.findOne({ 
      where: { id: assignUserDto.userId } 
    });
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }

    // Kullanıcı zaten projede mi kontrol et
    const existingAssignment = await this.projectUserRepository.findOne({
      where: { projectId, userId: assignUserDto.userId },
    });

    if (existingAssignment) {
      existingAssignment.role = assignUserDto.role;
      return this.projectUserRepository.save(existingAssignment);
    } else {
      const projectUser = this.projectUserRepository.create({
        projectId,
        userId: assignUserDto.userId,
        role: assignUserDto.role,
      });
      return this.projectUserRepository.save(projectUser);
    }
  }

  async removeUser(projectId: string, userId: string, adminUserId: string) {
    await this.checkProjectAccess(projectId, adminUserId, [ProjectRole.ADMIN]);

    const projectUser = await this.projectUserRepository.findOne({
      where: { projectId, userId },
    });

    if (!projectUser) {
      throw new NotFoundException('Kullanıcı bu projede bulunamadı');
    }

    await this.projectUserRepository.remove(projectUser);
    return { message: 'Kullanıcı projeden çıkarıldı' };
  }

  private async checkProjectAccess(
    projectId: string, 
    userId: string, 
    requiredRoles?: ProjectRole[]
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    // Admin her projeye erişebilir
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    const projectUser = await this.projectUserRepository.findOne({
      where: { projectId, userId },
      relations: ['project'],
    });

    if (!projectUser || !projectUser.project.isActive) {
      throw new ForbiddenException('Bu projeye erişim yetkiniz yok');
    }

    if (requiredRoles && !requiredRoles.includes(projectUser.role)) {
      throw new ForbiddenException('Bu işlem için yetkiniz yok');
    }

    return true;
  }

  async getUserProjectRole(projectId: string, userId: string): Promise<ProjectRole | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (user.role === UserRole.ADMIN) {
      return ProjectRole.ADMIN;
    }

    const projectUser = await this.projectUserRepository.findOne({
      where: { projectId, userId },
    });

    return projectUser?.role || null;
  }
}
