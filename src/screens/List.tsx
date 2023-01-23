import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, FlatList, Text, View } from 'react-native';

import { RootStackParamList } from '../RootApp';
import MButton from '../components/MButton';
import WeatherItem from '../components/WeatherItem';
import { useAppSelector } from '../hooks/redux';
import { selectIds } from '../reducers/citiesSlice';
import { selectAll, useGetWeatherByIdsQuery } from '../services/weatherApi';
import { useSelector } from 'react-redux';
type ListScreenProps = NativeStackScreenProps<RootStackParamList, 'List'>;

const List = ({ navigation }: ListScreenProps): JSX.Element => {
  const ids = useAppSelector(selectIds);
  const { data, error, isLoading, refetch } = useGetWeatherByIdsQuery(ids);
  // const data = useSelector(selectAll);

  if (isLoading) {
    return (
      <View className="bg-gray-100 flex-1 justify-center items-center">
        <Text className="text-3xl font-extrabold">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="bg-gray-100 flex-1 p-4">
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View className="h-4" />}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isLoading}
        onRefresh={refetch}
        renderItem={({ item }) => <WeatherItem item={item} navigation={navigation} />}
      />
    </View>
  );
};

export default List;
