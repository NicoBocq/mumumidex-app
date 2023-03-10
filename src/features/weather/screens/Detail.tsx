import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useLayoutEffect} from 'react'
import {View, Text} from 'react-native'
import {useSelector} from 'react-redux'

import {RootStackParamList} from '../../../AppNavigation'
import {Weather} from '../../../common/types'
import tw from '../../../lib/tailwind'
import {selectIds} from '../../cities/citiesSlice'
import {useGetWeatherByIdsQuery} from '../weatherApi'

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>

const Detail = (props: DetailScreenProps): JSX.Element => {
  const {route, navigation} = props
  const {id} = route.params
  const ids = useSelector(selectIds)

  const item = useGetWeatherByIdsQuery(ids, {
    selectFromResult: ({data}) => data?.find((item: Weather) => item.id === id),
  })

  useLayoutEffect(() => {
    navigation.setOptions({title: item.name})
  }, [item])

  return (
    <View>
      <Text style={tw.style('text-3xl')}>{item.name}</Text>
    </View>
  )
}

export default Detail
