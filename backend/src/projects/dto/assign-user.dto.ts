import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ProjectRole } from '../../entities/project-user.entity';

export class AssignUserDto {
  @ApiProperty({ example: 'uuid-of-user' })
  @IsNotEmpty({ message: 'Kullanıcı ID boş olamaz' })
  @IsString()
  userId: string;

  @ApiProperty({ enum: ProjectRole, example: ProjectRole.DEVELOPER })
  @IsEnum(ProjectRole, { message: 'Geçerli bir rol seçiniz' })
  role: ProjectRole;
}
