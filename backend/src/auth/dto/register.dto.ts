import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../../entities/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Geçerli bir email adresi giriniz' })
  email: string;

  @ApiProperty({ example: 'Ahmet' })
  @IsNotEmpty({ message: 'Ad boş olamaz' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Yılmaz' })
  @IsNotEmpty({ message: 'Soyad boş olamaz' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty({ message: 'Şifre boş olamaz' })
  @IsString()
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır' })
  password: string;

  @ApiProperty({ example: 'user', required: false })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Geçerli bir rol seçiniz' })
  role?: UserRole;
}
