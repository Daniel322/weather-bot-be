/* eslint-disable prettier/prettier */
export const codeToSmile = {
  Clear: `Ясно ${String.fromCodePoint(0x2600)}`,
  Clouds: `Облачно ${String.fromCodePoint(0x2601)}`,
  Rain: `Дождь ${String.fromCodePoint(0x2614)}`,
  Drizzle: `Дождь ${String.fromCodePoint(0x2614)}`,
  Thunderstorm: `Гроза ${String.fromCodePoint(0x26A1)}`,
  Snow: `Снег ${String.fromCodePoint(0x1f328)}`,
  Mist: `Туман ${String.fromCodePoint(0x1f32b)}`,
};

export interface WeaterApiResponse {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: MainIndicators;
  visibility: number;
  wind: Wind;
  clouds: Cloud;
  dt: number;
  sys: SystemParams;
  timezone: number;
  id: number;
  name: string;
  cod: string;
}

export interface SerializedResponse {
  date: string;
  city: string;
  temp: number;
  humidity: number;
  pressure: number;
  wind: number;
  sunrise: string;
  sunset: string;
  lengthOfDay: string;
  weather: string;
}

type Coordinates = {
  lon: number;
  lat: number;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type MainIndicators = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

type Cloud = {
  all: number;
};

type SystemParams = {
  country: string;
  sunrise: number;
  sunset: number;
};
