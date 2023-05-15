import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/:place')
  getWeaher(@Param('place') place: string, @Query('lang') lang = 'ru') {
    try {
      return this.weatherService.getWeather(place, lang);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
