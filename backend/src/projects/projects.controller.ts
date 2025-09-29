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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AssignUserDto } from './dto/assign-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Yeni proje oluştur' })
  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    return this.projectsService.create(createProjectDto, req.user.id);
  }

  @ApiOperation({ summary: 'Tüm projeleri listele' })
  @Get()
  findAll(@Request() req) {
    return this.projectsService.findAll(req.user.id);
  }

  @ApiOperation({ summary: 'Proje detayı' })
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.projectsService.findOne(id, req.user.id);
  }

  @ApiOperation({ summary: 'Proje güncelle' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req,
  ) {
    return this.projectsService.update(id, updateProjectDto, req.user.id);
  }

  @ApiOperation({ summary: 'Proje sil' })
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.projectsService.remove(id, req.user.id);
  }

  @ApiOperation({ summary: 'Projeye kullanıcı ata' })
  @Post(':id/users')
  assignUser(
    @Param('id') id: string,
    @Body() assignUserDto: AssignUserDto,
    @Request() req,
  ) {
    return this.projectsService.assignUser(id, assignUserDto, req.user.id);
  }

  @ApiOperation({ summary: 'Kullanıcıyı projeden çıkar' })
  @Delete(':id/users/:userId')
  removeUser(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Request() req,
  ) {
    return this.projectsService.removeUser(id, userId, req.user.id);
  }
}
