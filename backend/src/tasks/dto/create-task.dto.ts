import { ApiProperty } from '@nestjs/swagger';
import { 
  IsNotEmpty, 
  IsString, 
  IsOptional, 
  IsUUID, 
  IsEnum,
  IsDateString 
} from 'class-validator';
import { TaskStatus, TaskPriority } from '../../entities/task.entity';

export class CreateTaskDto {
  @ApiProperty({ example: 'Login sayfası tasarımı' })
  @IsNotEmpty({ message: 'Görev başlığı boş olamaz' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Kullanıcı giriş sayfası için modern tasarım', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: TaskStatus, example: TaskStatus.TODO })
  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Geçerli bir görev durumu seçiniz' })
  status?: TaskStatus;

  @ApiProperty({ enum: TaskPriority, example: TaskPriority.MEDIUM })
  @IsOptional()
  @IsEnum(TaskPriority, { message: 'Geçerli bir öncelik seçiniz' })
  priority?: TaskPriority;

  @ApiProperty({ example: 'uuid-of-board' })
  @IsNotEmpty({ message: 'Pano ID boş olamaz' })
  @IsUUID('4', { message: 'Geçerli bir pano ID giriniz' })
  boardId: string;

  @ApiProperty({ example: 'uuid-of-user', required: false })
  @IsOptional()
  @IsUUID('4', { message: 'Geçerli bir kullanıcı ID giriniz' })
  assigneeId?: string;

  @ApiProperty({ example: '2024-12-31', required: false })
  @IsOptional()
  @IsDateString({}, { message: 'Geçerli bir tarih giriniz' })
  dueDate?: string;
}
