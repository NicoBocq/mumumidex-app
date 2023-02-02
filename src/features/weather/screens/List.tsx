import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useCallback} from 'react'
import {FlatList, SafeAreaView, View} from 'react-native'
import {PlusIcon} from 'react-native-heroicons/solid'

import {RootStackParamList} from '../../../AppNavigation'
import MAlert from '../../../common/components/MAlert'
import MButton from '../../../common/components/MButton'
import Separator from '../../../common/components/MSeparator'
import {useAppSelector} from '../../../common/hooks/redux'
import tw from '../../../lib/tailwind'
import {selectIds} from '../../cities/citiesSlice'
import WeatherItem from '../components/WeatherItem'
import {useGetWeatherByIdsQuery} from '../weatherApi'
type ListScreenProps = NativeStackScreenProps<RootStackParamList, 'List'>

const List = ({navigation}: ListScreenProps): JSX.Element => {
  const ids = useAppSelector(selectIds)
  const {data, isError, isLoading, isFetching, refetch} =
    useGetWeatherByIdsQuery(ids)

  const renderItem = useCallback(({item}) => {
    return <WeatherItem item={item} navigation={navigation} />
  }, [])

  if (isError) {
    return (
      <MAlert
        type="alert"
        message="Unable to get data from server :("
        onRefresh={refetch}
        refreshing={isFetching}
      />
    )
  }

  return (
    <View style={tw.style('flex-1')}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <Separator />}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isLoading || isFetching}
        onRefresh={refetch}
        renderItem={renderItem}
        getItemLayout={(_, index) => ({
          length: 96,
          offset: 96 * index,
          index,
        })}
        contentContainerStyle={tw.style('bg-gray-100 px-4 py-4')}
      />
      <SafeAreaView style={tw.style('bg-ui')}>
        <View style={tw.style('flex-row justify-center bg-ui')}>
          <MButton
            style={tw.style('-mt-6 border-4 border-white')}
            rounded
            onPress={() => navigation.navigate('Add')}>
            <PlusIcon style={tw.style('text-white')} />
          </MButton>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default List
