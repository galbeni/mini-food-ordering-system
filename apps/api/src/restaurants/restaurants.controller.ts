import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RestaurantDetailResponseDto } from './dto/restaurant-detail-response.dto';
import { RestaurantResponseDto } from './dto/restaurant-response.dto';
import { RestaurantsService } from './restaurants.service';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  @ApiOperation({ summary: 'List all restaurants' })
  @ApiOkResponse({
    description: 'Restaurants returned.',
    type: [RestaurantResponseDto],
  })
  async findAll(): Promise<RestaurantResponseDto[]> {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return restaurant details including menu items' })
  @ApiOkResponse({
    description: 'Restaurant returned.',
    type: RestaurantDetailResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Restaurant not found.' })
  async findOne(@Param('id') id: string): Promise<RestaurantDetailResponseDto> {
    return this.restaurantsService.findOne(id);
  }
}
