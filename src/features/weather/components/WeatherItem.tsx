import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity, Swipeable } from 'react-native-gesture-handler';
import tw from 'twrnc';

import MButton from '../../../components/MButton';
import { useAppDispatch } from '../../../hooks/redux';
import { Weather } from '../../../types';
import { getHumidexBgClassColor } from '../../../utils';
import { removeCity } from '../../cities/citiesSlice';

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

  const formatDate = item.dt;

  return (
    <Swipeable renderRightActions={() => <MButton title="Remove" onPress={handleRemove} />}>
      <TouchableOpacity
        style={tw.style('shadow-sm rounded-lg p-4 bg-white')}
        onPress={handleDetail}>
        <View style={tw.style('flex-row items-center justify-between')}>
          <View>
            <Text style={tw.style('text-3xl font-medium')}>{item.name}</Text>
            <Text style={tw.style('text-sm text-gray-500')}>{item.sys.country}</Text>
            <Text>{formatDate}</Text>
          </View>
          <View
            style={tw.style(
              'flex-col w-1/4 justify-center items-center rounded-lg',
              getHumidexBgClassColor(item)
            )}>
            <Text style={tw.style('text-3xl text-white font-extrabold p-2')}>{item.humidex}</Text>
            <View
              style={tw.style(
                'flex-row w-full justify-between items-center text-xs font-medium border-t border-white p-2'
              )}>
              <Text style={tw.style('text-white')}>{item.main.feels_like}</Text>
              <Text style={tw.style('text-white')}>{item.main.humidity}%</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default memo(WeatherItem);