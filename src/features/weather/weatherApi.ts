import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Weather } from '../../types';
import { getHumidex } from '../../utils';

// const weatherAdapter = createEntityAdapter();
// const initialState = weatherAdapter.getInitialState();

export type RawResponse = {
  list: Weather[];
};

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
  tagTypes: ['Weather'],
  endpoints: (builder) => ({
    getWeatherByIds: builder.query<Weather[], number[]>({
      query: (ids) => ({
        url: 'group',
        params: {
          id: ids.join(','),
          appid: '1f1513e990129451ff67e76acc2d7100',
          units: 'metric',
          lang: 'en',
        },
      }),
      providesTags: (result) =>
        result ? [...result?.map(({ id }) => ({ type: 'Weather' as const, id }))] : ['Weather'],
      transformResponse: (response: RawResponse) => {
        return response.list
          .map((weather) => {
            return {
              ...weather,
              // dt: new Date(weather.dt * 1000),
              humidex: getHumidex({ temp: weather.main.temp, humidity: weather.main.humidity }),
            };
          })
          .sort((a, b) => b.humidex - a.humidex);
        // return weatherAdapter.setAll(initialState, result);
      },
    }),
    findCity: builder.query<Weather[], string>({
      query: (city) => ({
        url: 'find',
        params: {
          q: city,
          appid: '1f1513e990129451ff67e76acc2d7100',
          lang: 'en',
        },
      }),
      transformResponse: (response: RawResponse) => {
        return response.list;
      },
    }),
  }),
});

export const { useFindCityQuery, useGetWeatherByIdsQuery } = weatherApi;
