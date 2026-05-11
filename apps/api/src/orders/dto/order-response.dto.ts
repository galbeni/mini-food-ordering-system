import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { RestaurantResponseDto } from '../../restaurants/dto/restaurant-response.dto';
import { OrderItemResponseDto } from './order-item-response.dto';

export class OrderResponseDto {
  @ApiProperty({
    example: '9a2bbf21-b33f-40d0-aae3-24cb661d2f79',
  })
  id!: string;

  @ApiProperty({
    example: '8f1d7f2e-5c92-4f8e-b8f1-b4d4df4c6d91',
  })
  userId!: string;

  @ApiProperty({
    example: 'f5e60d88-458a-4b99-b60d-cf5e1e7c9b7a',
  })
  restaurantId!: string;

  @ApiProperty({
    enum: OrderStatus,
    example: OrderStatus.PENDING,
  })
  status!: OrderStatus;

  @ApiProperty({
    example: 6980,
    description: 'Total order price stored in the smallest currency unit.',
  })
  totalPrice!: number;

  @ApiProperty({
    type: RestaurantResponseDto,
  })
  restaurant!: RestaurantResponseDto;

  @ApiProperty({
    type: [OrderItemResponseDto],
  })
  items!: OrderItemResponseDto[];

  @ApiProperty({
    example: '2026-05-11T10:00:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-05-11T10:00:00.000Z',
  })
  updatedAt!: Date;
}
