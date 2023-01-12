import React, { memo } from 'react';
import { Button, Text, View } from 'react-native';

import { useAppDispatch } from '../hooks';
import { removeCity } from '../reducers/uiSlice';
import { Weather } from '../types';

type WeatherItemProps = {
  item: Weather;
};

const WeatherItem = (props: WeatherItemProps): JSX.Element => {
  const { item } = props;
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeCity(item.id));
  };

  return (
    <View className="bg-white shadow-sm rounded-lg p-4">
      <Text className="text-2xl font-bold">
        {item.name} {item.sys.country}
      </Text>
      <Text className="text-xl font-bold">{item.humidex}</Text>
      {/* <Text className="text-xl font-bold">{new Date(item.dt).toDateString()}</Text> */}
      <Button title="Remove" onPress={handleRemove} />
    </View>
  );
};

export default memo(WeatherItem);
