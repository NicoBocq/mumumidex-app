export type Main = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

export type Weather = {
  id: number
  main: Main
  dt: number
  description: string
  icon: string
  name: string
  humidex: number
  sys: {
    country: string
  }
}

export type City = {
  id: number
  name: string
  sys: {
    country: string
  }
}

export type Size = 'sm' | 'md' | 'lg'
export type Theme = 'primary' | 'secondary'
export type Variant = 'ghost' | 'outline' | 'solid'
