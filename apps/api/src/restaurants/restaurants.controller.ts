import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
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
  @ApiOperation({
    summary: 'List all restaurants',
    description: 'Returns all available restaurants without menu details.',
  })
  @ApiOkResponse({
    description: 'Restaurants returned.',
    type: [RestaurantResponseDto],
  })
  async findAll(): Promise<RestaurantResponseDto[]> {
    return await this.restaurantsService.findAll();
  }

  @Get(':slug')
  @ApiOperation({
    summary: 'Return restaurant details including menu items',
    description:
      'Returns a single restaurant by slug together with its available menu items.',
  })
  @ApiParam({
    name: 'slug',
    example: 'pasta-palace',
  })
  @ApiOkResponse({
    description: 'Restaurant returned.',
    type: RestaurantDetailResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Restaurant not found.',
  })
  async findOne(
    @Param('slug') slug: string,
  ): Promise<RestaurantDetailResponseDto> {
    return await this.restaurantsService.findOneBySlug(slug);
  }
}
