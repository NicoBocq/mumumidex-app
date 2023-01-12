import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootStackParamList } from '../RootApp';
import { useGetWeatherByIdsQuery } from '../services/weatherApi';
import { selectIds, removeCity } from '../uiSlice';

type ListScreenProps = NativeStackScreenProps<RootStackParamList, 'List'>;

const List = ({ navigation }: ListScreenProps): JSX.Element => {
  const ids = useSelector(selectIds);
  const dispatch = useDispatch();
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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View className="bg-white shadow-sm rounded-lg p-4">
            <Text className="text-2xl font-bold">
              {item.name} {item.sys.country}
            </Text>
            <Text className="text-xl font-bold">{item.humidex}</Text>
            <Button title="Remove" onPress={() => dispatch(removeCity(item.id))} />
          </View>
        )}
      />
      <Button title="Add" onPress={handleNavigate} />
    </View>
  );
};

export default List;
