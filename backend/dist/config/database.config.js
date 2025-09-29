"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const user_entity_1 = require("../entities/user.entity");
const project_entity_1 = require("../entities/project.entity");
const project_user_entity_1 = require("../entities/project-user.entity");
const board_entity_1 = require("../entities/board.entity");
const task_entity_1 = require("../entities/task.entity");
exports.databaseConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'todoapp',
    entities: [user_entity_1.User, project_entity_1.Project, project_user_entity_1.ProjectUser, board_entity_1.Board, task_entity_1.Task],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
};
//# sourceMappingURL=database.config.js.map