import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import tw from 'twrnc';

import MButton from './MButton';

const MHeader = (props: NativeStackHeaderProps): JSX.Element => {
  const { back, navigation, options } = props;

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView style={tw.style('bg-brand')}>
        <StatusBar style="light" />
      </SafeAreaView>

      <View style={tw.style('h-12 px-4 bg-brand flex-row items-center justify-between')}>
        {back && <MButton title="back" onPress={handleBack} />}
        <Text style={tw.style('text-3xl font-extrabold text-white')}>{options.title}</Text>
      </View>
    </>
  );
};

export default MHeader;
