import React, { memo } from 'react';
import { Button, Text, View } from 'react-native';
import { TouchableOpacity, Swipeable } from 'react-native-gesture-handler';

import { useAppDispatch } from '../hooks/redux';
import { removeCity } from '../reducers/citiesSlice';
import { Weather } from '../types';
import { getHumidexBgClassColor } from '../utils';
import MButton from './MButton';

type WeatherItemProps = {
  item: Weather;
  navigation: any;
};

const WeatherItem = (props: WeatherItemProps): JSX.Element => {
  const { item, navigation } = props;
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeCity(item.id));
  };

  const handleDetail = () => {
    navigation.navigate('Detail', { id: item.id });
  };

  // format unix date
  const formatDate = new Date(item.dt * 1000).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <Swipeable renderRightActions={() => <MButton title="Remove" onPress={handleRemove} />}>
      <TouchableOpacity className="shadow-sm rounded-lg p-4 bg-white" onPress={handleDetail}>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-3xl font-medium">{item.name}</Text>
            <Text className="text-sm text-gray-500">{item.sys.country}</Text>
            <Text>{formatDate}</Text>
          </View>
          <View
            className={`flex-col w-1/4 justify-center items-center rounded-lg ${getHumidexBgClassColor(
              item
            )}`}>
            <Text className="text-3xl text-white font-extrabold p-2">{item.humidex}</Text>
            <View className="flex-row w-full justify-between items-center text-xs font-medium border-t border-white p-2">
              <Text className="text-white">{item.main.feels_like}</Text>
              <Text className="text-white">{item.main.humidity}%</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default memo(WeatherItem);
