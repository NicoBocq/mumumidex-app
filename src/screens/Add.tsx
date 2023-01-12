import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, TextInput, View } from 'react-native';

import { RootStackParamList } from '../RootApp';
import { useGetCityIdMutation } from '../services/weatherApi';

type AddScreenProps = NativeStackScreenProps<RootStackParamList, 'Add'>;

const Add = ({ navigation }: AddScreenProps): JSX.Element => {
  const [city, setCity] = React.useState('');
  const [addCityId, { isLoading: isLoadingCity }] = useGetCityIdMutation();
  const handlePress = () => {
    addCityId(city);
    navigation.goBack();
  };

  return (
    <View className="bg-gray-100 flex-1 p-4">
      <TextInput
        className="border-2 border-gray-300 rounded-lg p-2 m-2"
        placeholder="SALUT"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Add" onPress={handlePress} disabled={isLoadingCity} />
    </View>
  );
};

export default Add;
