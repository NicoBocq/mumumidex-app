import {NativeStackHeaderProps} from '@react-navigation/native-stack'
import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {Text, View, SafeAreaView} from 'react-native'

import tw from '../../lib/tailwind'
import MButton from './MButton'

const MHeader = (props: NativeStackHeaderProps): JSX.Element => {
  const {back, navigation, options} = props

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <>
      <SafeAreaView style={tw.style('bg-ui')}>
        <StatusBar style="light" />
      </SafeAreaView>

      <View
        style={tw.style(
          'h-16 px-4 bg-ui flex-row items-center',
          back ? 'justify-start' : 'justify-center',
        )}>
        {back && (
          <MButton
            onPress={handleBack}
            icon="back"
            theme="primary"
            variant="ghost"
            size="md"
            style="-ml-1 mr-2"
          />
        )}
        <Text
          style={tw.style(
            'text-3xl font-extrabold text-white flex-1',
            back ? '' : 'text-center',
          )}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {options.title}
        </Text>
      </View>
    </>
  )
}

export default MHeader
