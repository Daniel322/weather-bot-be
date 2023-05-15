import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';

import {
  SerializedResponse,
  WeaterApiResponse,
  codeToSmile,
} from './weather.types';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly weatherApiToken: string;
  private readonly weatherUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.weatherApiToken = this.configService.get('weatherApi.token');
    this.weatherUrl = this.configService.get('weatherApi.url');
  }

  async getWeather(place: string, lang = 'ru'): Promise<SerializedResponse> {
    try {
      const { data: result } = await firstValueFrom(
        this.httpService.get<WeaterApiResponse>(
          `${this.weatherUrl}/data/2.5/weather?q=${place}&lang=${lang}&units=metric&appid=${this.weatherApiToken}`,
        ), //TODO: add possibility to change language from telegram account language
      );

      return this.serializeResult(result);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  private serializeResult(data: WeaterApiResponse): SerializedResponse {
    const weatherDescription: string =
      codeToSmile[data.weather[0].main] || data.weather[0].main;
    return {
      date: new Date().toLocaleString(data.sys.country),
      city: data.name,
      temp: data.main.temp,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind: data.wind.speed,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(
        data.sys.country,
      ),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(
        data.sys.country,
      ),
      lengthOfDay: new Date(
        (data.sys.sunset - data.sys.sunrise) * 1000,
      ).toLocaleTimeString(data.sys.country),
      weather: weatherDescription,
    };
  }
}
