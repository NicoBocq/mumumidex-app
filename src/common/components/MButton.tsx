import React from 'react'
import {Text, TouchableOpacity} from 'react-native'
import {Style} from 'twrnc/dist/esm/types'

import tw from '../../lib/tailwind'
import {Size, Theme, Variant} from '../types'
import MICon from './MIcon'

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
}

const MButton = (props: MButtonProps): JSX.Element => {
  const {
    title,
    onPress,
    children,
    loading,
    disabled,
    variant = 'solid',
    theme = 'primary',
    size = 'lg',
    style,
    testID,
    icon,
    ...restProps
  } = props

  const isIconOnly = !!icon && !title
  const isGhost = variant === 'ghost'
  const isOutline = variant === 'outline'

  const bgDict = {
    primary: 'bg-brand',
    secondary: 'bg-gray-300',
  }

  const borderDict = {
    primary: 'border-brand',
    secondary: 'border-gray-300',
  }

  const textColorDict = {
    primary: 'text-white',
    secondary: 'text-black',
  }

  const textSizeDict = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  const spacingDict = {
    sm: 'p-0.5',
    md: 'p-1',
    lg: 'p-2',
  }

  const bgStyle = isGhost ? 'bg-transparent' : bgDict[theme]
  const borderStyle = isOutline ? 'border-transparent' : borderDict[theme]

  const wrapperStyle = tw.style(
    'flex-row items-center justify-center',
    bgDict[theme],
    bgStyle,
    borderStyle,
    spacingDict[size],
    isIconOnly ? 'rounded-full' : 'rounded-lg',
    style,
  )
  const textStyle = tw.style(
    'font-semibold text-lg',
    textColorDict[theme],
    textSizeDict[size],
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
      {...restProps}
      testID={testID}>
      {title && <Text style={textStyle}>{title}</Text>}
      {!!icon && typeof icon === 'string' ? (
        <MICon name={icon} size={size} style={textStyle} />
      ) : icon ? (
        icon
      ) : null}
      {children && children}
    </TouchableOpacity>
  )
}

export default MButton
