import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Project } from '../entities/project.entity';
import { ProjectUser } from '../entities/project-user.entity';
import { Board } from '../entities/board.entity';
import { Task } from '../entities/task.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'todoapp',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Project, ProjectUser, Board, Task],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: ['src/database/subscribers/*.ts'],
});
