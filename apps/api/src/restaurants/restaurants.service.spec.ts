import { NotFoundException } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { PrismaService } from '../prisma/prisma.service';

type PrismaMock = {
  restaurant: {
    findMany: jest.Mock;
    findUnique: jest.Mock;
  };
};

describe('RestaurantsService', () => {
  let service: RestaurantsService;

  const prismaMock: PrismaMock = {
    restaurant: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new RestaurantsService(prismaMock as unknown as PrismaService);
  });

  describe('findAll', () => {
    it('should return all restaurants ordered by creation date', async () => {
      const restaurants = [
        {
          id: 'restaurant-id',
          name: 'Pasta Palace',
          slug: 'pasta-palace',
          description: 'Fresh Italian pasta.',
          imageUrl: null,
          createdAt: new Date(),
        },
      ];

      prismaMock.restaurant.findMany.mockResolvedValue(restaurants);

      const result = await service.findAll();

      expect(result).toEqual(restaurants);
      expect(prismaMock.restaurant.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdAt: 'asc',
        },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          imageUrl: true,
          createdAt: true,
        },
      });
    });
  });

  describe('findOneBySlug', () => {
    it('should throw NotFoundException when restaurant does not exist', async () => {
      prismaMock.restaurant.findUnique.mockResolvedValue(null);

      await expect(service.findOneBySlug('unknown-slug')).rejects.toThrow(
        NotFoundException,
      );

      expect(prismaMock.restaurant.findUnique).toHaveBeenCalledWith({
        where: {
          slug: 'unknown-slug',
        },
        include: {
          menuItems: {
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      });
    });
  });
});
