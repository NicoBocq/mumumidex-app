import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { Weather } from '../../../common/types';
import tw from '../../../lib/tailwind';

export type CityListItemProps = {
  item: Weather;
  onPress: (id: number) => void;
};

const CityListItem = ({ item, onPress }: CityListItemProps): JSX.Element => {
  const { id, name, sys } = item;

  const handlePress = () => {
    onPress(id);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={tw.style('flex-row justify-between items-center flex-1')}>
      <Text style={tw.style('text-lg font-semibold text-gray-900')}>{name}</Text>
      <Text style={tw.style('text-lg font-medium text-gray-500')}>{sys.country}</Text>
    </TouchableOpacity>
  );
};

export default memo(CityListItem);
