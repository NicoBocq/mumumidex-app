import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getHumidex } from '../utils';

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
  sys: {
    country: string;
  };
};

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<Weather, string>({
      query: (city) => `weather?q=${city}&appid=1f1513e990129451ff67e76acc2d7100&units=metric`,
    }),
    getWeatherByIds: builder.query<Weather[], string>({
      query: (ids) => ({
        url: 'group',
        params: {
          id: ids,
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
    getCityId: builder.mutation<number, string>({
      query: (city) => `weather?q=${city}&appid=1f1513e990129451ff67e76acc2d7100&units=metric`,
      transformResponse: (response: { id: number }) => response.id,
    }),
  }),
});

export const { useGetWeatherByCityQuery, useGetCityIdMutation, useGetWeatherByIdsQuery } =
  weatherApi;
