import BottomSheet, { BottomSheetFlatList, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { RootStackParamList } from '../../../RootApp';
import { useAppDispatch } from '../../../common/hooks/redux';
import { City } from '../../../common/types';
import tw from '../../../lib/tailwind';
import { useFindCityQuery } from '../../weather/weatherApi';
import { addCityId } from '../citiesSlice';

type AddScreenProps = NativeStackScreenProps<RootStackParamList, 'Add'>;

const Add = ({ navigation }: AddScreenProps): JSX.Element => {
  const [city, setCity] = useState<string>('');
  const { data, isLoading } = useFindCityQuery(city, {
    skip: city.length <= 3,
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     sheetRef.current?.expand();
  //   }, 1000);
  // }, []);

  const dispatch = useAppDispatch();

  const handleSelect = (item: City) => {
    dispatch(addCityId(item.id));
    navigation.goBack();
  };

  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = ['25%', '50%', '100%'];

  const renderItem = ({ item }: { item: City }) => (
    <TouchableOpacity onPress={() => handleSelect(item)}>
      <Text style={tw.style('text-xl font-bold')}>{item.name}</Text>
      <Text style={tw.style('text-lg')}>{item.sys.country}</Text>
    </TouchableOpacity>
  );

  const handleSheetChange = (index: number) => {
    console.log('handleSheetChange', index);
  };

  return (
    <View style={tw.style('flex-1 p-4')}>
      <BottomSheet ref={sheetRef} snapPoints={snapPoints} onChange={handleSheetChange}>
        <BottomSheetTextInput />
        {/* <BottomSheetFlatList
          data={data}
          // keyExtractor={(i) => i?.id?.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
        /> */}
      </BottomSheet>
    </View>
  );
};

export default Add;
