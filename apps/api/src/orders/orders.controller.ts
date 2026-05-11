import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { OrdersService } from './orders.service';
import type { AuthenticatedUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Orders')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create an order for the logged-in customer',
    description:
      'Creates a new order for the authenticated customer. The initial status is PENDING.',
  })
  @ApiCreatedResponse({
    description: 'Order created.',
    type: OrderResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid order payload or invalid menu item.',
  })
  @ApiUnauthorizedResponse({
    description: 'Missing, invalid or expired access token.',
  })
  @ApiNotFoundResponse({
    description: 'Restaurant not found.',
  })
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    return await this.ordersService.create(user.id, createOrderDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Return details of a specific customer order',
    description:
      'Returns a single order only if it belongs to the authenticated customer.',
  })
  @ApiParam({
    name: 'id',
    example: '9a2bbf21-b33f-40d0-aae3-24cb661d2f79',
  })
  @ApiOkResponse({
    description: 'Order returned.',
    type: OrderResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing, invalid or expired access token.',
  })
  @ApiForbiddenResponse({
    description: 'The order belongs to another customer.',
  })
  @ApiNotFoundResponse({
    description: 'Order not found.',
  })
  async findOne(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
  ): Promise<OrderResponseDto> {
    return await this.ordersService.findOne(user.id, id);
  }
}
