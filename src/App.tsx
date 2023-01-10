import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

import { useGetWeatherByCityQuery } from './api';

const Weather = () => {
  const { data, error, isLoading } = useGetWeatherByCityQuery('Lyon');

  if (isLoading) {
    return (
      <View className="bg-gray-100 flex-1 justify-center items-center">
        <Text className="text-3xl font-extrabold">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="bg-gray-100 flex-1 justify-center items-center">
      <Text className="text-3xl font-extrabold">{data.main.humidity}</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default Weather;
