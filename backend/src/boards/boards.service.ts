import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../entities/board.entity';
import { Project } from '../entities/project.entity';
import { ProjectsService } from '../projects/projects.service';
import { ProjectRole } from '../entities/project-user.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private projectsService: ProjectsService,
  ) {}

  async create(createBoardDto: CreateBoardDto, userId: string) {
    // Proje erişimi kontrol et
    const userRole = await this.projectsService.getUserProjectRole(
      createBoardDto.projectId,
      userId,
    );
    
    if (!userRole || userRole === ProjectRole.VIEWER) {
      throw new ForbiddenException('Bu projeye pano ekleme yetkiniz yok');
    }

    const project = await this.projectRepository.findOne({
      where: { id: createBoardDto.projectId, isActive: true },
    });
    
    if (!project) {
      throw new NotFoundException('Proje bulunamadı');
    }

    // Son sırayı bul
    const lastBoard = await this.boardRepository.findOne({
      where: { projectId: createBoardDto.projectId },
      order: { order: 'DESC' },
    });

    const board = this.boardRepository.create({
      ...createBoardDto,
      order: lastBoard ? lastBoard.order + 1 : 0,
    });

    return this.boardRepository.save(board);
  }

  async findAllByProject(projectId: string, userId: string) {
    // Proje erişimi kontrol et
    const userRole = await this.projectsService.getUserProjectRole(projectId, userId);
    
    if (!userRole) {
      throw new ForbiddenException('Bu projeye erişim yetkiniz yok');
    }

    return this.boardRepository.find({
      where: { projectId, isActive: true },
      order: { order: 'ASC' },
      relations: ['tasks', 'tasks.assignee'],
    });
  }

  async findOne(id: string, userId: string) {
    const board = await this.boardRepository.findOne({
      where: { id, isActive: true },
      relations: ['project', 'tasks', 'tasks.assignee', 'tasks.createdBy'],
    });

    if (!board) {
      throw new NotFoundException('Pano bulunamadı');
    }

    // Proje erişimi kontrol et
    const userRole = await this.projectsService.getUserProjectRole(
      board.projectId,
      userId,
    );
    
    if (!userRole) {
      throw new ForbiddenException('Bu panoya erişim yetkiniz yok');
    }

    return board;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto, userId: string) {
    const board = await this.boardRepository.findOne({
      where: { id, isActive: true },
    });

    if (!board) {
      throw new NotFoundException('Pano bulunamadı');
    }

    // Proje erişimi kontrol et
    const userRole = await this.projectsService.getUserProjectRole(
      board.projectId,
      userId,
    );
    
    if (!userRole || userRole === ProjectRole.VIEWER) {
      throw new ForbiddenException('Bu panoyu düzenleme yetkiniz yok');
    }

    Object.assign(board, updateBoardDto);
    return this.boardRepository.save(board);
  }

  async remove(id: string, userId: string) {
    const board = await this.boardRepository.findOne({
      where: { id, isActive: true },
    });

    if (!board) {
      throw new NotFoundException('Pano bulunamadı');
    }

    // Proje erişimi kontrol et
    const userRole = await this.projectsService.getUserProjectRole(
      board.projectId,
      userId,
    );
    
    if (!userRole || userRole === ProjectRole.VIEWER) {
      throw new ForbiddenException('Bu panoyu silme yetkiniz yok');
    }

    board.isActive = false;
    return this.boardRepository.save(board);
  }

  async reorderBoards(projectId: string, boardIds: string[], userId: string) {
    // Proje erişimi kontrol et
    const userRole = await this.projectsService.getUserProjectRole(projectId, userId);
    
    if (!userRole || userRole === ProjectRole.VIEWER) {
      throw new ForbiddenException('Pano sıralamasını değiştirme yetkiniz yok');
    }

    const boards = await this.boardRepository.find({
      where: { projectId, isActive: true },
    });

    // Güvenlik kontrolü - tüm board'lar bu projeye ait mi?
    const projectBoardIds = boards.map(b => b.id);
    const invalidIds = boardIds.filter(id => !projectBoardIds.includes(id));
    
    if (invalidIds.length > 0) {
      throw new ForbiddenException('Geçersiz pano ID\'leri');
    }

    // Sıralamaları güncelle
    for (let i = 0; i < boardIds.length; i++) {
      await this.boardRepository.update(boardIds[i], { order: i });
    }

    return { message: 'Pano sıralaması güncellendi' };
  }
}
