import React from 'react';
import { Button, FlatList, Text, TextInput, StatusBar, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useGetWeatherByIdsQuery, useGetCityIdMutation } from './services/api';
import { selectIds, removeCity } from './uiSlice';

const Weather = () => {
  const ids = useSelector(selectIds);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetWeatherByIdsQuery(ids);

  const [addCityId, { isLoading: isLoadingCity }] = useGetCityIdMutation();
  const handlePress = () => {
    addCityId(city);
  };

  const [city, setCity] = React.useState('');

  if (isLoading) {
    return (
      <View className="bg-gray-100 flex-1 justify-center items-center">
        <Text className="text-3xl font-extrabold">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="bg-gray-100 flex-1 p-4">
      <StatusBar />
      {/* <Text className="text-3xl font-extrabold">{data.main.feels_like}</Text> */}
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View className="h-2" />}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View className="bg-white shadow-md rounded-lg p-4">
            <Text className="text-2xl font-bold">
              {item.name} {item.sys.country}
            </Text>
            <Text className="text-xl font-bold">{item.humidex}</Text>
            <Button title="Remove" onPress={() => dispatch(removeCity(item.id))} />
          </View>
        )}
      />
      <TextInput
        className="border-2 border-gray-300 rounded-lg p-2 m-2"
        placeholder="SALUT"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Add" onPress={handlePress} disabled={isLoadingCity} />
    </View>
  );
};

export default Weather;
