import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProjectUser } from './project-user.entity';
import { Board } from './board.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ProjectUser, (projectUser) => projectUser.project, {
    cascade: true,
  })
  projectUsers: ProjectUser[];

  @OneToMany(() => Board, (board) => board.project, { cascade: true })
  boards: Board[];
}
