import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { Board } from '../entities/board.entity';
import { User } from '../entities/user.entity';
import { ProjectsService } from '../projects/projects.service';
import { ProjectRole } from '../entities/project-user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private projectsService: ProjectsService,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const board = await this.boardRepository.findOne({
      where: { id: createTaskDto.boardId, isActive: true },
      relations: ['project'],
    });

    if (!board) {
      throw new NotFoundException('Pano bulunamadı');
    }

    // Proje erişimi ve yetki kontrol et
    const userRole = await this.projectsService.getUserProjectRole(
      board.project.id,
      userId,
    );

    if (!userRole || userRole === ProjectRole.VIEWER) {
      throw new ForbiddenException('Bu panoya görev ekleme yetkiniz yok');
    }

    // Atanan kullanıcı kontrolü
    if (createTaskDto.assigneeId) {
      const assigneeRole = await this.projectsService.getUserProjectRole(
        board.project.id,
        createTaskDto.assigneeId,
      );
      
      if (!assigneeRole) {
        throw new ForbiddenException('Atanan kullanıcı bu projeye erişimi yok');
      }
    }

    // Son sırayı bul
    const lastTask = await this.taskRepository.findOne({
      where: { boardId: createTaskDto.boardId },
      order: { order: 'DESC' },
    });

    const task = this.taskRepository.create({
      ...createTaskDto,
      createdById: userId,
      order: lastTask ? lastTask.order + 1 : 0,
    });

    return this.taskRepository.save(task);
  }

  async findAllByBoard(boardId: string, userId: string) {
    const board = await this.boardRepository.findOne({
      where: { id: boardId, isActive: true },
      relations: ['project'],
    });

    if (!board) {
      throw new NotFoundException('Pano bulunamadı');
    }

    // Proje erişimi kontrol et
    const userRole = await this.projectsService.getUserProjectRole(
      board.project.id,
      userId,
    );

    if (!userRole) {
      throw new ForbiddenException('Bu panoya erişim yetkiniz yok');
    }

    return this.taskRepository.find({
      where: { boardId },
      order: { order: 'ASC' },
      relations: ['assignee', 'createdBy'],
    });
  }

  async findOne(id: string, userId: string) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['board', 'board.project', 'assignee', 'createdBy'],
    });

    if (!task) {
      throw new NotFoundException('Görev bulunamadı');
    }

    // Proje erişimi kontrol et
    const userRole = await this.projectsService.getUserProjectRole(
      task.board.project.id,
      userId,
    );

    if (!userRole) {
      throw new ForbiddenException('Bu göreve erişim yetkiniz yok');
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['board', 'board.project'],
    });

    if (!task) {
      throw new NotFoundException('Görev bulunamadı');
    }

    // Proje erişimi ve yetki kontrol et
    const userRole = await this.projectsService.getUserProjectRole(
      task.board.project.id,
      userId,
    );

    if (!userRole || userRole === ProjectRole.VIEWER) {
      throw new ForbiddenException('Bu görevi düzenleme yetkiniz yok');
    }

    // Atanan kullanıcı kontrolü
    if (updateTaskDto.assigneeId) {
      const assigneeRole = await this.projectsService.getUserProjectRole(
        task.board.project.id,
        updateTaskDto.assigneeId,
      );
      
      if (!assigneeRole) {
        throw new ForbiddenException('Atanan kullanıcı bu projeye erişimi yok');
      }
    }

    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async remove(id: string, userId: string) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['board', 'board.project'],
    });

    if (!task) {
      throw new NotFoundException('Görev bulunamadı');
    }

    // Proje erişimi ve yetki kontrol et
    const userRole = await this.projectsService.getUserProjectRole(
      task.board.project.id,
      userId,
    );

    if (!userRole || userRole === ProjectRole.VIEWER) {
      throw new ForbiddenException('Bu görevi silme yetkiniz yok');
    }

    return this.taskRepository.remove(task);
  }

  async moveTask(id: string, moveTaskDto: MoveTaskDto, userId: string) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['board', 'board.project'],
    });

    if (!task) {
      throw new NotFoundException('Görev bulunamadı');
    }

    // Hedef pano kontrolü
    const targetBoard = await this.boardRepository.findOne({
      where: { id: moveTaskDto.targetBoardId, isActive: true },
      relations: ['project'],
    });

    if (!targetBoard) {
      throw new NotFoundException('Hedef pano bulunamadı');
    }

    // Her iki projeye de erişim kontrolü
    const sourceProjectRole = await this.projectsService.getUserProjectRole(
      task.board.project.id,
      userId,
    );

    const targetProjectRole = await this.projectsService.getUserProjectRole(
      targetBoard.project.id,
      userId,
    );

    if (!sourceProjectRole || sourceProjectRole === ProjectRole.VIEWER ||
        !targetProjectRole || targetProjectRole === ProjectRole.VIEWER) {
      throw new ForbiddenException('Görevi taşıma yetkiniz yok');
    }

    // Görev sıralamasını güncelle
    if (moveTaskDto.targetBoardId !== task.boardId) {
      // Farklı panoya taşıma
      task.boardId = moveTaskDto.targetBoardId;
      
      // Hedef panodaki son sırayı bul
      const lastTaskInTarget = await this.taskRepository.findOne({
        where: { boardId: moveTaskDto.targetBoardId },
        order: { order: 'DESC' },
      });
      
      task.order = lastTaskInTarget ? lastTaskInTarget.order + 1 : 0;
    }

    // Status güncelle
    if (moveTaskDto.status) {
      task.status = moveTaskDto.status;
    }

    // Sıralama güncelle
    if (moveTaskDto.newOrder !== undefined) {
      task.order = moveTaskDto.newOrder;
      
      // Aynı panodaki diğer görevlerin sıralamasını güncelle
      await this.reorderTasksInBoard(task.boardId, task.id, moveTaskDto.newOrder);
    }

    return this.taskRepository.save(task);
  }

  private async reorderTasksInBoard(boardId: string, movedTaskId: string, newOrder: number) {
    const tasks = await this.taskRepository.find({
      where: { boardId },
      order: { order: 'ASC' },
    });

    // Taşınan görevi listeden çıkar
    const movedTaskIndex = tasks.findIndex(t => t.id === movedTaskId);
    if (movedTaskIndex > -1) {
      tasks.splice(movedTaskIndex, 1);
    }

    // Yeni sıralamayı uygula
    for (let i = 0; i < tasks.length; i++) {
      if (i >= newOrder) {
        tasks[i].order = i + 1;
      } else {
        tasks[i].order = i;
      }
      await this.taskRepository.save(tasks[i]);
    }
  }

  async getTasksByUser(userId: string, projectId?: string) {
    const queryBuilder = this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.board', 'board')
      .leftJoinAndSelect('board.project', 'project')
      .leftJoinAndSelect('task.assignee', 'assignee')
      .leftJoinAndSelect('task.createdBy', 'createdBy')
      .where('task.assigneeId = :userId', { userId });

    if (projectId) {
      queryBuilder.andWhere('project.id = :projectId', { projectId });
    }

    return queryBuilder
      .orderBy('task.createdAt', 'DESC')
      .getMany();
  }
}
