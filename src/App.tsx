import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { useGetWeatherByCityQuery, useGetWeatherByCitiesQuery } from './api';

const Weather = () => {
  // const { data, error, isLoading } = useGetWeatherByCityQuery('Marseille');
  const { data: data2, error: error2, isLoading: isLoading2 } = useGetWeatherByCitiesQuery();

  if (isLoading2) {
    return (
      <View className="bg-gray-100 flex-1 justify-center items-center">
        <Text className="text-3xl font-extrabold">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="bg-gray-100 flex-1 justify-center items-center">
      <StatusBar style="auto" />
      {/* <Text className="text-3xl font-extrabold">{data.main.feels_like}</Text> */}
      <FlatList
        data={data2}
        renderItem={({ item }) => (
          <View className="bg-white shadow-md rounded-lg p-4 m-2">
            <Text className="text-2xl font-bold">{item.name}</Text>
            <Text className="text-xl font-bold">{item.humidex}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Weather;
