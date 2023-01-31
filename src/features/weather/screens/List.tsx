import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, Text, View, SafeAreaView } from 'react-native';
import tw from 'twrnc';

import { RootStackParamList } from '../../../RootApp';
import MButton from '../../../components/MButton';
import { useAppSelector } from '../../../hooks/redux';
import { selectIds } from '../../cities/citiesSlice';
import WeatherItem from '../components/WeatherItem';
import { useGetWeatherByIdsQuery } from '../weatherApi';
type ListScreenProps = NativeStackScreenProps<RootStackParamList, 'List'>;

const List = ({ navigation }: ListScreenProps): JSX.Element => {
  const ids = useAppSelector(selectIds);
  const { data, error, isLoading, refetch } = useGetWeatherByIdsQuery(ids);

  if (isLoading) {
    return (
      <View style={tw.style('bg-gray-100 flex-1 justify-center items-center')}>
        <Text style={tw.style('text-3xl font-extrabold')}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={tw.style('bg-gray-100 flex-1 px-4 py-4 relative')}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={tw.style('h-4')} />}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isLoading}
        onRefresh={refetch}
        renderItem={({ item }) => <WeatherItem item={item} navigation={navigation} />}
      />
      <SafeAreaView>
        <View style={tw.style('absolute bottom-0 left-0 right-0 p-4')}>
          <MButton onPress={() => navigation.navigate('Add')} title="Add" />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default List;
