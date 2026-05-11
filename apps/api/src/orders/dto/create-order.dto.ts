import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({
    example: '2d1fbd3d-1f1e-4cf6-a1bc-6a2609f4d2c9',
  })
  @IsString()
  menuItemId!: string;

  @ApiProperty({
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateOrderDto {
  @ApiProperty({
    example: 'f5e60d88-458a-4b99-b60d-cf5e1e7c9b7a',
  })
  @IsString()
  restaurantId!: string;

  @ApiProperty({
    type: [CreateOrderItemDto],
    example: [
      {
        menuItemId: '2d1fbd3d-1f1e-4cf6-a1bc-6a2609f4d2c9',
        quantity: 2,
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}
