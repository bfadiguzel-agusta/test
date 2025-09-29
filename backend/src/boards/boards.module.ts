import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from '../entities/board.entity';
import { Project } from '../entities/project.entity';
import { ProjectUser } from '../entities/project-user.entity';
import { User } from '../entities/user.entity';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, Project, ProjectUser, User]),
    ProjectsModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [BoardsService],
})
export class BoardsModule {}
