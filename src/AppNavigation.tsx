import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'

import MHeader from './common/components/MHeader'
import Add from './features/cities/screens/Add'
import Detail from './features/weather/screens/Detail'
import List from './features/weather/screens/List'

export type RootStackParamList = {
  Add: undefined
  Detail: {id: number}
  List: undefined
}

const AppNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="List"
        screenOptions={{
          header: (props) => <MHeader {...props} />,
        }}>
        <Stack.Screen
          name="List"
          component={List}
          options={{
            title: 'MumuMidex',
          }}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            headerShown: false,
            presentation: 'transparentModal',
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          getId={({params}) => params.id.toString()}
          options={{
            title: 'Detail',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
