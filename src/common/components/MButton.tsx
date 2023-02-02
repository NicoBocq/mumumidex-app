import React from 'react'
import {Text, TouchableOpacity} from 'react-native'
import {Style} from 'twrnc/dist/esm/types'

import tw from '../../lib/tailwind'

export type MButtonProps = {
  onPress?: () => void
  title?: string
  children?: React.ReactNode
  icon?: React.ReactNode | string
  loading?: boolean
  disabled?: boolean
  theme?: Theme
  variant?: Variant
  size?: Size
  style?: string | Style
  testID?: string
  rounded?: boolean
}

export type Size = 'small' | 'medium' | 'large'
export type Theme = 'primary' | 'secondary'
export type Variant = 'ghost' | 'outline' | 'solid'

const MButton = (props: MButtonProps): JSX.Element => {
  const {
    title,
    onPress,
    children,
    loading,
    disabled,
    variant = 'solid',
    theme = 'primary',
    size = 'large',
    style,
    testID,
    rounded = false,
  } = props

  const bgColor = {
    primary: 'bg-brand',
    secondary: 'bg-gray-300',
  }

  const textColor = {
    primary: 'text-white',
    secondary: 'text-black',
  }

  const spacing = {
    small: 'p-1',
    medium: 'p-2',
    large: 'p-3',
  }

  const wrapperStyle = tw.style(
    'rounded-lg flex-row items-center justify-center',
    style,
    bgColor[theme],
    spacing[size],
    rounded && 'rounded-full',
  )
  const textwrapperStyle = tw.style('flex-row items-center justify-center')
  const textStyle = tw.style(
    'text-white font-semibold text-lg',
    textColor[theme],
  )

  const handlePress = () => {
    if (disabled || loading) {
      return
    }
    onPress()
  }

  return (
    <TouchableOpacity
      style={wrapperStyle}
      onPress={handlePress}
      testID={testID}>
      {title && <Text style={textStyle}>{title}</Text>}
      {children && children}
    </TouchableOpacity>
  )
}

export default MButton
