import React, {useEffect, useRef} from 'react'
import {Animated, RefreshControl, ScrollView, Text, View} from 'react-native'

import tw from '../../lib/tailwind'

export type MAlertProps = {
  message?: string
  type: 'alert' | 'success' | 'warning'
  onRefresh?: () => void
  refreshing?: boolean
  testID?: string
}

const MAlert = ({
  message,
  type,
  onRefresh,
  refreshing,
  testID,
}: MAlertProps): JSX.Element => {
  const color = {
    alert: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-600',
    },
    success: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-600',
    },
    warning: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      border: 'border-yellow-600',
    },
  }

  const animation: number = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [animation])

  const containerStyle = tw.style('flex-col items-center justify-center')

  const wrapperStyle = tw.style(
    'flex-row items-center justify-between shadow',
    color[type].bg,
    color[type].border,
    {
      opacity: animation,
      transform: [
        {
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [-200, 0],
          }),
        },
      ],
    },
  )

  const textStyle = tw.style('text-sm font-medium', color[type].text)

  const Component = onRefresh ? ScrollView : View

  const contextualComponentProps = onRefresh
    ? {contentContainerStyle: containerStyle}
    : {style: containerStyle}

  return (
    <Component {...contextualComponentProps} testID={testID}>
      {onRefresh && (
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing}
          testID="refreshControl"
        />
      )}
      <Animated.View style={wrapperStyle}>
        <View style={tw.style('flex-row items-center p-4 flex-1')}>
          <Text style={tw.style('flex-1', textStyle)}>{message}</Text>
        </View>
      </Animated.View>
    </Component>
  )
}

export default MAlert
