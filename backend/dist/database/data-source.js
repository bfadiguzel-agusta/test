"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const project_entity_1 = require("../entities/project.entity");
const project_user_entity_1 = require("../entities/project-user.entity");
const board_entity_1 = require("../entities/board.entity");
const task_entity_1 = require("../entities/task.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'todoapp',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
    entities: [user_entity_1.User, project_entity_1.Project, project_user_entity_1.ProjectUser, board_entity_1.Board, task_entity_1.Task],
    migrations: ['src/database/migrations/*.ts'],
    subscribers: ['src/database/subscribers/*.ts'],
});
//# sourceMappingURL=data-source.js.map