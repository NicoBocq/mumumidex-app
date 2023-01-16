import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import MHeader from './components/MHeader';
import Add from './screens/Add';
import Detail from './screens/Detail';
import List from './screens/List';

export type RootStackParamList = {
  List: undefined;
  Add: undefined;
  Detail: { id: number };
};

const RootApp = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
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
            title: 'Weather',
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            title: 'Detail',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            title: 'Add a city',
            presentation: 'transparentModal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootApp;
