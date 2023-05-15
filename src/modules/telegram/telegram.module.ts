import { WeatherModule } from '@modules/weather/weather.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TelegramService } from './telegram.service';

@Module({
  exports: [TelegramService],
  imports: [ConfigModule, WeatherModule],
  providers: [TelegramService],
})
export class TelegramModule {}
