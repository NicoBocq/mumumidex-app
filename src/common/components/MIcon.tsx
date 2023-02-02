import React from 'react'
import {ExclamationTriangleIcon} from 'react-native-heroicons/outline'
import {FireIcon, ChevronLeftIcon, PlusIcon} from 'react-native-heroicons/solid'
import {Style} from 'twrnc/dist/esm/types'

import tw from '../../lib/tailwind'
import {Size} from '../types'

export type MIconProps = {
  name: string
  size?: Size | number
  style?: string | Style
  testID?: string
}

const iconDict = {
  back: ChevronLeftIcon,
  fire: FireIcon,
  plus: PlusIcon,
  undefined: ExclamationTriangleIcon,
}

const sizeDict = {
  sm: 16,
  md: 24,
  lg: 32,
}

const MICon = (props: MIconProps): JSX.Element => {
  const {name, size, style} = props
  const sizeValue = typeof size === 'number' ? size : sizeDict[size]
  const styleValue = tw.style('flex-shrink-0', style)
  const Component = iconDict[name] ? iconDict[name] : undefined
  return <Component {...props} size={sizeValue} style={styleValue} />
}

export default MICon
