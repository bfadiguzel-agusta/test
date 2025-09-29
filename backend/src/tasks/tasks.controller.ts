import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Yeni görev oluştur' })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.create(createTaskDto, req.user.id);
  }

  @ApiOperation({ summary: 'Panoya ait görevleri listele' })
  @Get('board/:boardId')
  findAllByBoard(@Param('boardId') boardId: string, @Request() req) {
    return this.tasksService.findAllByBoard(boardId, req.user.id);
  }

  @ApiOperation({ summary: 'Kullanıcıya atanan görevleri listele' })
  @ApiQuery({ name: 'projectId', required: false })
  @Get('user/assigned')
  getTasksByUser(@Request() req, @Query('projectId') projectId?: string) {
    return this.tasksService.getTasksByUser(req.user.id, projectId);
  }

  @ApiOperation({ summary: 'Görev detayı' })
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.tasksService.findOne(id, req.user.id);
  }

  @ApiOperation({ summary: 'Görev güncelle' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    return this.tasksService.update(id, updateTaskDto, req.user.id);
  }

  @ApiOperation({ summary: 'Görev sil' })
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.tasksService.remove(id, req.user.id);
  }

  @ApiOperation({ summary: 'Görevi taşı (drag & drop)' })
  @Put(':id/move')
  moveTask(
    @Param('id') id: string,
    @Body() moveTaskDto: MoveTaskDto,
    @Request() req,
  ) {
    return this.tasksService.moveTask(id, moveTaskDto, req.user.id);
  }
}
