import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RestaurantDetailResponseDto } from './dto/restaurant-detail-response.dto';
import { RestaurantResponseDto } from './dto/restaurant-response.dto';

@Injectable()
export class RestaurantsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<RestaurantResponseDto[]> {
    return await this.prisma.restaurant.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string): Promise<RestaurantDetailResponseDto> {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        id,
      },
      include: {
        menuItems: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found.');
    }

    return restaurant;
  }
}
