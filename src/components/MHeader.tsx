import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, Text, View } from 'react-native';

import MButton from './MButton';

const MHeader = (props: NativeStackHeaderProps): JSX.Element => {
  const { back, navigation, options } = props;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAdd = () => {
    navigation.navigate('Add');
  };

  return (
    <>
      <StatusBar barStyle="light-content" translucent />
      <View className="h-12 bg-red-900 flex-row items-center justify-between">
        {back && <MButton title="back" onPress={handleBack} />}
        <Text className="text-3xl text-white">{options.title}</Text>
        <MButton title="add" onPress={handleAdd} />
      </View>
    </>
  );
};

export default MHeader;
