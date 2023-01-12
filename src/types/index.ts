export type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};

export type Weather = {
  id: number;
  main: Main;
  dt: Date;
  description: string;
  icon: string;
  name: string;
  humidex: number;
  sys: {
    country: string;
  };
};
