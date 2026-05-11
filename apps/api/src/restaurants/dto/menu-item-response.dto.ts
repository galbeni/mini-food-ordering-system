import { ApiProperty } from '@nestjs/swagger';

export class MenuItemResponseDto {
  @ApiProperty({
    example: '2d1fbd3d-1f1e-4cf6-a1bc-6a2609f4d2c9',
  })
  id!: string;

  @ApiProperty({
    example: 'Spaghetti Carbonara',
  })
  name!: string;

  @ApiProperty({
    example: 'Classic carbonara with pancetta and parmesan.',
  })
  description!: string;

  @ApiProperty({
    example: 3490,
    description: 'Price stored in the smallest currency unit.',
  })
  price!: number;

  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9',
    nullable: true,
  })
  imageUrl!: string | null;

  @ApiProperty({
    example: '2026-05-11T10:00:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-05-11T10:00:00.000Z',
  })
  updatedAt!: Date;
}
