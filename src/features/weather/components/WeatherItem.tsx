import React, {memo} from 'react'
import {Text, View} from 'react-native'
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler'

import MButton from '../../../common/components/MButton'
import {useAppDispatch} from '../../../common/hooks/redux'
import {Weather} from '../../../common/types'
import {getHumidexBgClassColor} from '../../../common/utils'
import tw from '../../../lib/tailwind'
import {removeCity} from '../../cities/citiesSlice'

type WeatherItemProps = {
  item: Weather
  navigation: any
}

const WeatherItem = (props: WeatherItemProps): JSX.Element => {
  const {item, navigation} = props
  const dispatch = useAppDispatch()
  const handleRemove = () => {
    dispatch(removeCity(item.id))
  }

  const handleDetail = () => {
    navigation.navigate('Detail', {id: item.id})
  }

  const formatDate = item.dt

  return (
    <Swipeable
      renderRightActions={() => (
        <MButton title="Remove" onPress={handleRemove} />
      )}>
      <TouchableOpacity
        style={tw.style('shadow-sm rounded-lg p-4 bg-white h-26')}
        onPress={handleDetail}>
        <View style={tw.style('flex-row items-center justify-between flex-1')}>
          <View style={tw.style('flex-1 mr-4')}>
            <Text style={tw.style('text-xl font-extrabold leading-5')}>
              {item.name}
            </Text>
            <Text style={tw.style('text-gray-500 text-sm mt-1')}>
              {formatDate}
            </Text>
          </View>
          <View
            style={tw.style(
              'flex-col w-1/4 justify-center items-center rounded-lg flex-shrink-0',
              getHumidexBgClassColor(item),
            )}>
            <Text style={tw.style('text-2xl text-white font-extrabold p-1')}>
              {item.humidex}
            </Text>
            <View
              style={tw.style(
                'flex-row w-full justify-between items-center text-xs font-medium border-t border-white py-2 px-2',
              )}>
              <Text style={tw.style('text-white')}>{item.main.feels_like}</Text>
              <Text style={tw.style('text-white')}>{item.main.humidity}%</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

export default memo(WeatherItem)
