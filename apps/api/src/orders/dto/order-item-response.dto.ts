import { ApiProperty } from '@nestjs/swagger';
import { MenuItemResponseDto } from '../../restaurants/dto/menu-item-response.dto';

export class OrderItemResponseDto {
  @ApiProperty({
    example: '5ddfcfc5-4c93-4e1f-98a9-07b7ccdedf1d',
  })
  id!: string;

  @ApiProperty({
    example: '2d1fbd3d-1f1e-4cf6-a1bc-6a2609f4d2c9',
  })
  menuItemId!: string;

  @ApiProperty({
    example: 2,
  })
  quantity!: number;

  @ApiProperty({
    example: 3490,
    description: 'Unit price at the time of order.',
  })
  unitPrice!: number;

  @ApiProperty({
    type: MenuItemResponseDto,
  })
  menuItem!: MenuItemResponseDto;
}
