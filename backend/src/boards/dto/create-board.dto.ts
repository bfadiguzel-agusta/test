import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({ example: 'Sprint 1' })
  @IsNotEmpty({ message: 'Pano adı boş olamaz' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'İlk sprint panosu', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'uuid-of-project' })
  @IsNotEmpty({ message: 'Proje ID boş olamaz' })
  @IsUUID('4', { message: 'Geçerli bir proje ID giriniz' })
  projectId: string;
}
