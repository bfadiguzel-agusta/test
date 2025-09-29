import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from '../entities/task.entity';
import { Board } from '../entities/board.entity';
import { User } from '../entities/user.entity';
import { ProjectUser } from '../entities/project-user.entity';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Board, User, ProjectUser]),
    ProjectsModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
