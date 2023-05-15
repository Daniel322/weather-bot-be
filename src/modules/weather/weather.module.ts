import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  controllers: [WeatherController],
  exports: [WeatherService],
  imports: [ConfigModule, HttpModule],
  providers: [WeatherService],
})
export class WeatherModule {}
