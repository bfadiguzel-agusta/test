import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
  Query,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Tüm kullanıcıları listele (Admin)' })
  @Get()
  findAll(@Request() req) {
    return this.usersService.findAll(req.user.id);
  }

  @ApiOperation({ summary: 'Kullanıcı ara (Admin)' })
  @ApiQuery({ name: 'q', description: 'Arama sorgusu' })
  @Get('search')
  searchUsers(@Query('q') query: string, @Request() req) {
    return this.usersService.searchUsers(query, req.user.id);
  }

  @ApiOperation({ summary: 'Kullanıcı detayı' })
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.usersService.findOne(id, req.user.id);
  }

  @ApiOperation({ summary: 'Kullanıcı rolünü güncelle (Admin)' })
  @Patch(':id/role')
  updateUserRole(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
    @Request() req,
  ) {
    return this.usersService.updateUserRole(
      id,
      updateUserRoleDto.role,
      req.user.id,
    );
  }

  @ApiOperation({ summary: 'Kullanıcıyı deaktive et (Admin)' })
  @Delete(':id')
  deactivateUser(@Param('id') id: string, @Request() req) {
    return this.usersService.deactivateUser(id, req.user.id);
  }
}
