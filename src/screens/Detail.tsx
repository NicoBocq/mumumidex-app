import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { RootStackParamList } from '../RootApp';
import { selectIds } from '../reducers/citiesSlice';
import { useGetWeatherByIdsQuery } from '../services/weatherApi';
import { Weather } from '../types';

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const Detail = (props: DetailScreenProps): JSX.Element => {
  const { route } = props;
  const { id } = route.params;
  const ids = useSelector(selectIds);

  const item = useGetWeatherByIdsQuery(ids, {
    selectFromResult: ({ data }) => data?.find((item: Weather) => item.id === id),
  });

  return (
    <View>
      <Text className="text-3xl">{item.name}</Text>
    </View>
  );
};

export default Detail;
