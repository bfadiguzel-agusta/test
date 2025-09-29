import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UserRole } from '../../entities/user.entity';

export class UpdateUserRoleDto {
  @ApiProperty({ enum: UserRole, example: UserRole.ADMIN })
  @IsEnum(UserRole, { message: 'Geçerli bir kullanıcı rolü seçiniz' })
  role: UserRole;
}
