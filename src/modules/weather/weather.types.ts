export const codeToSmile = {
  Clear: `Ясно \U00002600`,
  Clouds: `Облачно \U00002601`,
  Rain: `Дождь \U00002614`,
  Drizzle: `Дождь \U00002614`,
  Thunderstorm: `Гроза \U000026A1`,
  Snow: `Снег \U0001F328`,
  Mist: `Туман \U0001F32B`,
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
