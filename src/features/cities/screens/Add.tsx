import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet'
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useCallback, useMemo, useRef, useState} from 'react'
import {View, Text} from 'react-native'

import {RootStackParamList} from '../../../AppNavigation'
import MSeparator from '../../../common/components/MSeparator'
import {useAppDispatch} from '../../../common/hooks/redux'
import useDebounce from '../../../common/hooks/useDebounce'
import tw from '../../../lib/tailwind'
import {useFindCityQuery} from '../../weather/weatherApi'
import {addCityId} from '../citiesSlice'
import CityListItem from '../components/CityListItem'

type AddScreenProps = NativeStackScreenProps<RootStackParamList, 'Add'>

type ListHeaderComponentProps = {
  onChange: (text: string) => void
  value: string
}

const ListHeaderComponent = ({
  onChange,
  value,
}: ListHeaderComponentProps): JSX.Element => {
  return (
    <View style={tw.style('bg-white pb-4')}>
      <BottomSheetTextInput
        placeholder="Search for a city"
        onChangeText={onChange}
        value={value}
        style={tw.style(
          'bg-gray-50 border rounded-lg py-4 px-6 border-gray-300',
        )}
        autoFocus
      />
    </View>
  )
}

const Add = ({navigation}: AddScreenProps): JSX.Element => {
  const [city, setCity] = useState<string>('')
  const debounceValue = useDebounce(city)
  const {data, isLoading, isSuccess} = useFindCityQuery(debounceValue, {
    skip: city.length <= 3,
  })

  const dispatch = useAppDispatch()

  const handleSelect = (id: number) => {
    dispatch(addCityId(id))
    handleClose()
  }

  const sheetRef = useRef<BottomSheet>(null)

  const snapPoints = useMemo(() => ['33%'], [])

  const renderItem = useCallback(
    ({item}) => <CityListItem item={item} onPress={handleSelect} />,
    [],
  )

  const handleClose = () => {
    navigation.goBack()
  }

  const ListEmptyComponent = () => {
    if (!isSuccess || !data) {
      return null
    }
    return (
      <View style={tw.style('flex-1 justify-center items-center')}>
        <Text style={tw.style('text-lg font-medium text-gray-600')}>
          No results found
        </Text>
      </View>
    )
  }

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        opacity={0}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  )

  return (
    <View style={tw.style('flex-1 p-4 mb-4')}>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={handleClose}
        style={tw.style('shadow-xl')}
        backdropComponent={renderBackdrop}>
        <BottomSheetFlatList
          ListHeaderComponent={ListHeaderComponent({
            onChange: setCity,
            value: city,
          })}
          data={data}
          refreshing={isLoading}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={tw.style('pt-4 px-4')}
          stickyHeaderIndices={[0]}
          ItemSeparatorComponent={MSeparator}
          ListEmptyComponent={ListEmptyComponent}
        />
      </BottomSheet>
    </View>
  )
}

export default Add
