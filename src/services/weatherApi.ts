import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Weather } from '../types';
import { getHumidex } from '../utils';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
  tagTypes: ['Weather'],
  endpoints: (builder) => ({
    getWeatherByIds: builder.query<Weather[], string>({
      query: (ids) => ({
        url: 'group',
        params: {
          id: ids,
          appid: '1f1513e990129451ff67e76acc2d7100',
          units: 'metric',
          lang: 'fr',
        },
      }),
      providesTags: (result) =>
        result ? [...result?.map(({ id }) => ({ type: 'Weather' as const, id }))] : ['Weather'],
      transformResponse: (response: { list: Weather[] }) => {
        return response.list
          .map((weather) => {
            return {
              ...weather,
              humidex: getHumidex({ temp: weather.main.temp, humidity: weather.main.humidity }),
            };
          })
          .sort((a, b) => b.humidex - a.humidex);
      },
    }),
    getCityId: builder.mutation<number, string>({
      query: (city) => ({
        url: 'weather',
        params: {
          q: city,
          appid: '1f1513e990129451ff67e76acc2d7100',
          units: 'metric',
          lang: 'fr',
        },
      }),
      transformResponse: (response: { id: number }) => response.id,
    }),
  }),
});

export const { useGetCityIdMutation, useGetWeatherByIdsQuery } = weatherApi;
