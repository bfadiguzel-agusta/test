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
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ReorderBoardsDto } from './dto/reorder-boards.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Boards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiOperation({ summary: 'Yeni pano oluştur' })
  @Post()
  create(@Body() createBoardDto: CreateBoardDto, @Request() req) {
    return this.boardsService.create(createBoardDto, req.user.id);
  }

  @ApiOperation({ summary: 'Projeye ait panoları listele' })
  @Get('project/:projectId')
  findAllByProject(@Param('projectId') projectId: string, @Request() req) {
    return this.boardsService.findAllByProject(projectId, req.user.id);
  }

  @ApiOperation({ summary: 'Pano detayı' })
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.boardsService.findOne(id, req.user.id);
  }

  @ApiOperation({ summary: 'Pano güncelle' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @Request() req,
  ) {
    return this.boardsService.update(id, updateBoardDto, req.user.id);
  }

  @ApiOperation({ summary: 'Pano sil' })
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.boardsService.remove(id, req.user.id);
  }

  @ApiOperation({ summary: 'Pano sıralamasını güncelle' })
  @Put('project/:projectId/reorder')
  reorderBoards(
    @Param('projectId') projectId: string,
    @Body() reorderBoardsDto: ReorderBoardsDto,
    @Request() req,
  ) {
    return this.boardsService.reorderBoards(
      projectId,
      reorderBoardsDto.boardIds,
      req.user.id,
    );
  }
}
