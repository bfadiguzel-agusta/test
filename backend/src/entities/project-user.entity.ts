import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

export enum ProjectRole {
  ADMIN = 'admin',
  DEVELOPER = 'developer',
  VIEWER = 'viewer',
}

@Entity('project_users')
export class ProjectUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  projectId: string;

  @Column({
    type: 'enum',
    enum: ProjectRole,
    default: ProjectRole.VIEWER,
  })
  role: ProjectRole;

  @CreateDateColumn()
  assignedAt: Date;

  @ManyToOne(() => User, (user) => user.projectUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Project, (project) => project.projectUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
