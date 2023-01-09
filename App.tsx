import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

const App = () => {
  return (
    <View className="bg-gray-500 flex-1 justify-center items-center">
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
