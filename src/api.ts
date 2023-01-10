import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  description: string;
  icon: string;
  name: string;
  humidex: number;
};

const getHumidex = ({ temp, humidity }) => {
  const e = 6.112 * Math.pow(10, (7.5 * temp) / (237.7 + temp)) * (humidity / 100);
  return Math.round(temp + (5 / 9) * (e - 10));
};

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<Weather, string>({
      query: (city) => `weather?q=${city}&appid=1f1513e990129451ff67e76acc2d7100&units=metric`,
    }),
    getWeatherByCities: builder.query<Weather[], void>({
      query: () => ({
        url: 'group',
        params: {
          id: '524901,703448,2643743',
          appid: '1f1513e990129451ff67e76acc2d7100',
          units: 'metric',
        },
      }),
      transformResponse: (response: { list: Weather[] }) => {
        return response.list.map((weather) => {
          return {
            ...weather,
            humidex: getHumidex({ temp: weather.main.temp, humidity: weather.main.humidity }),
          };
        });
      },
    }),
    getCityId: builder.query<number, string>({
      query: (city) => `weather?q=${city}&appid=1f1513e990129451ff67e76acc2d7100&units=metric`,
      transformResponse: (response: { id: number }) => response.id,
    }),
  }),
});

export const { useGetWeatherByCityQuery, useGetCityIdQuery, useGetWeatherByCitiesQuery } =
  weatherApi;
