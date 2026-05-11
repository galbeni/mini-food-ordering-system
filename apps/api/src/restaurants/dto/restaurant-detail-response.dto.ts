import { ApiProperty } from '@nestjs/swagger';
import { MenuItemResponseDto } from './menu-item-response.dto';

export class RestaurantDetailResponseDto {
  @ApiProperty({
    example: 'f5e60d88-458a-4b99-b60d-cf5e1e7c9b7a',
  })
  id!: string;

  @ApiProperty({
    example: 'Pasta Palace',
  })
  name!: string;

  @ApiProperty({
    example: 'pasta-palace',
  })
  slug!: string;

  @ApiProperty({
    example: 'Fresh Italian pasta, pizza and comfort food.',
  })
  description!: string;

  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    nullable: true,
  })
  imageUrl!: string | null;

  @ApiProperty({
    type: [MenuItemResponseDto],
  })
  menuItems!: MenuItemResponseDto[];

  @ApiProperty({
    example: '2026-05-11T10:00:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-05-11T10:00:00.000Z',
  })
  updatedAt!: Date;
}
