import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { TaskStatus } from '../../entities/task.entity';

export class MoveTaskDto {
  @ApiProperty({ example: 'uuid-of-target-board' })
  @IsUUID('4', { message: 'Geçerli bir pano ID giriniz' })
  targetBoardId: string;

  @ApiProperty({ enum: TaskStatus, required: false })
  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Geçerli bir görev durumu seçiniz' })
  status?: TaskStatus;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Sıra numarası sayı olmalıdır' })
  newOrder?: number;
}
