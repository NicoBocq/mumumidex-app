import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Add from './screens/Add';
import List from './screens/List';

export type RootStackParamList = {
  List: undefined;
  Add: undefined;
};

const RootApp = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen
          name="List"
          component={List}
          options={{
            title: 'Weather',
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
