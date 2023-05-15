import * as Joi from '@hapi/joi';
import { registerAs } from '@nestjs/config';

const env = registerAs('env', () => ({
  type: process.env.NODE_ENV,
}));

const weatherApi = registerAs('weatherApi', () => ({
  token: process.env.OPEN_WEATHER_API_TOKEN,
  url: process.env.OPEN_WEATHER_URL,
}));

const telegramApi = registerAs('telegram', () => ({
  token: process.env.TELEGRAM_BOT_TOKEN,
}));

const throttle = registerAs('throttle', () => ({
  ttl: process.env.THROTTLE_TTL,
  limit: process.env.THROTTLE_LIMIT,
}));

export const EnvConfig = {
  envFilePath: `.env.${process.env.NODE_ENV}`,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .required(),
    TELEGRAM_BOT_TOKEN: Joi.string().optional(),
    OPEN_WEATHER_API_TOKEN: Joi.string().required(),
    OPEN_WEATHER_URL: Joi.string().required(),
    THROTTLE_TTL: Joi.string().required(),
    THROTTLE_LIMIT: Joi.string().required(),
  }),
  load: [env, weatherApi, telegramApi, throttle],
  isGlobal: true,
};
