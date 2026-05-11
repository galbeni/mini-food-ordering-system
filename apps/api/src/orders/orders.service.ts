import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        id: createOrderDto.restaurantId,
      },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found.');
    }

    const menuItemIds = createOrderDto.items.map((item) => item.menuItemId);

    const menuItems = await this.prisma.menuItem.findMany({
      where: {
        id: {
          in: menuItemIds,
        },
        restaurantId: createOrderDto.restaurantId,
      },
    });

    if (menuItems.length !== menuItemIds.length) {
      throw new BadRequestException(
        'One or more menu items are invalid for this restaurant.',
      );
    }

    const menuItemById = new Map(
      menuItems.map((menuItem) => [menuItem.id, menuItem]),
    );

    const totalPrice = createOrderDto.items.reduce((sum, item) => {
      const menuItem = menuItemById.get(item.menuItemId);

      if (!menuItem) {
        return sum;
      }

      return sum + menuItem.price * item.quantity;
    }, 0);

    const order = await this.prisma.order.create({
      data: {
        userId,
        restaurantId: createOrderDto.restaurantId,
        totalPrice,
        items: {
          create: createOrderDto.items.map((item) => {
            const menuItem = menuItemById.get(item.menuItemId);

            if (!menuItem) {
              throw new BadRequestException('Invalid menu item.');
            }

            return {
              menuItemId: item.menuItemId,
              quantity: item.quantity,
              unitPrice: menuItem.price,
            };
          }),
        },
      },
      include: {
        restaurant: true,
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    return order;
  }

  async findOne(userId: string, orderId: string): Promise<OrderResponseDto> {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        restaurant: true,
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    if (order.userId !== userId) {
      throw new ForbiddenException('You cannot access this order.');
    }

    return order;
  }

  async findAllForUser(userId: string): Promise<OrderResponseDto[]> {
    return await this.prisma.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        restaurant: true,
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });
  }
}
