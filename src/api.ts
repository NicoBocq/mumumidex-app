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
};

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<Weather, string>({
      query: (city) => `weather?q=${city}&appid=1f1513e990129451ff67e76acc2d7100`,
    }),
  }),
});

export const { useGetWeatherByCityQuery } = weatherApi;
