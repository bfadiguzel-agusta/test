import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class ReorderBoardsDto {
  @ApiProperty({ 
    example: ['uuid1', 'uuid2', 'uuid3'], 
    description: 'Yeni sıralamada pano ID\'leri' 
  })
  @IsArray({ message: 'Board ID\'leri dizi olmalıdır' })
  @IsUUID('4', { each: true, message: 'Geçerli UUID\'ler giriniz' })
  boardIds: string[];
}
