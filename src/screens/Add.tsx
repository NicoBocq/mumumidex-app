import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

import { RootStackParamList } from '../RootApp';
import { useAppDispatch } from '../hooks/redux';
import { addCityId } from '../reducers/citiesSlice';
import { useFindCityQuery } from '../services/weatherApi';
import { City } from '../types';

type AddScreenProps = NativeStackScreenProps<RootStackParamList, 'Add'>;

const Add = ({ navigation }: AddScreenProps): JSX.Element => {
  const [city, setCity] = useState<string>('');
  const { data, isLoading: isLoadingCity } = useFindCityQuery(city, {
    skip: city.length <= 3,
  });
  const dispatch = useAppDispatch();

  const handleSelect = (item: City) => {
    dispatch(addCityId(item.id));
    navigation.goBack();
  };

  return (
    <View className="bg-gray-100 flex-1 p-4 relative">
      <View className="absolute inset-0 flex-1 z-1">
        <Autocomplete
          data={data}
          value={city}
          onChangeText={setCity}
          flatListProps={{
            keyExtractor: (item: City) => item.id.toString(),
            renderItem: ({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)}>
                <Text className="p-2 text-base text-gray-900">
                  {item.name} {item.sys.country}
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
      </View>
    </View>
  );
};

export default Add;
