import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'Todo Uygulaması' })
  @IsNotEmpty({ message: 'Proje adı boş olamaz' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Modern todo yönetim uygulaması', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
