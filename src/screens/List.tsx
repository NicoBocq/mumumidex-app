import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, FlatList, Text, View } from 'react-native';

import { RootStackParamList } from '../RootApp';
import WeatherItem from '../components/WeatherItem';
import { useAppSelector } from '../hooks';
import { selectIds } from '../reducers/uiSlice';
import { useGetWeatherByIdsQuery } from '../services/weatherApi';

type ListScreenProps = NativeStackScreenProps<RootStackParamList, 'List'>;

const List = ({ navigation }: ListScreenProps): JSX.Element => {
  const ids = useAppSelector(selectIds);
  const { data, error, isLoading } = useGetWeatherByIdsQuery(ids);

  const handleNavigate = () => {
    navigation.navigate('Add');
  };

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
        renderItem={({ item }) => <WeatherItem item={item} />}
      />
      <Button title="Add" onPress={handleNavigate} />
    </View>
  );
};

export default List;
