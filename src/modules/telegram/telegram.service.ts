import {
  Injectable,
  OnApplicationShutdown,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf, Context } from 'telegraf';
import { message } from 'telegraf/filters';

import { Bind } from '@common/decorators';
import { WeatherService } from '@modules/weather/weather.service';

@Injectable()
export class TelegramService implements OnApplicationShutdown, OnModuleInit {
  private readonly logger = new Logger(TelegramService.name);

  private readonly bot: Telegraf;

  constructor(
    private readonly configService: ConfigService,
    private readonly weatherService: WeatherService,
  ) {
    this.bot = new Telegraf(this.configService.get('telegram.token'));
  }

  onModuleInit() {
    this.bot.start(this.onStart);
    this.bot
      .launch()
      .catch((error) =>
        this.logger.error(`Bot launch: ${error.message}`, error.stack),
      );
    this.bot.on(message('text'), this.getWeather);
  }

  onApplicationShutdown(signal?: string): void {
    if (signal === 'SIGINT') this.bot.stop('SIGINT');
    else if (signal === 'SIGTERM') this.bot.stop('SIGTERM');
  }

  @Bind
  private async onStart(ctx: Context): Promise<void> {
    try {
      const { from } = ctx.message;

      console.log(from);

      this.bot.on(message('text'), this.getWeather);

      await ctx.reply('Добро пожаловать в Weather bot!');
      await ctx.reply('Напишите город, в котором вы хотите узнать погоду.');
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  @Bind
  private async getWeather(ctx: Context): Promise<void> {
    try {
      if ('text' in ctx.message) {
        const {
          from: { language_code },
          text,
        } = ctx.message;
        const weatherResponse = await this.weatherService.getWeather(
          text,
          language_code,
        );

        await ctx.reply(`
        ${String.fromCodePoint(0x1f570)} ${weatherResponse.date}\n
        Погода в городе: ${weatherResponse.city}\n
        Температура: ${Math.floor(weatherResponse.temp)}°C ${
          weatherResponse.weather
        }\n
        Влажность: ${weatherResponse.humidity}%\n
        Давление: ${Math.ceil(weatherResponse.pressure / 1.333)} мм.рт.ст\n
        Ветер: ${weatherResponse.wind} м/с\n
        ${String.fromCodePoint(0x1f305)} Восход солнца: ${
          weatherResponse.sunrise
        }\n
        ${String.fromCodePoint(0x1f307)} Закат солнца: ${
          weatherResponse.sunset
        }\n
        Продолжительность дня: ${weatherResponse.lengthOfDay}\n
        Хорошего дня!
        `);
      }
    } catch (error) {
      await ctx.reply('Не удалось узнать погоду для данного города...');
      this.logger.error(error.message, error.stack);
    }
  }
}
