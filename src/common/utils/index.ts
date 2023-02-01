import {Weather} from '../types'

export const getHumidex = ({temp, humidity}) => {
  const e =
    6.112 * Math.pow(10, (7.5 * temp) / (237.7 + temp)) * (humidity / 100)
  return Math.round(temp + (5 / 9) * (e - 10))
}

export const getHumidexBgClassColor = (item: Weather) => {
  if (!item) {
    return ''
  }

  switch (true) {
    case item.humidex <= 29:
      return 'bg-green-700'
    case item.humidex <= 39:
      return 'bg-yellow-700'
    case item.humidex <= 45:
      return 'bg-red-700'
    default:
      return 'bg-red-900'
  }
}
