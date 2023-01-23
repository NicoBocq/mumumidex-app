import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export type MButtonProps = {
  onPress?: () => void;
  title?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode | string;
  loading?: boolean;
  disabled?: boolean;
  theme?: 'primary' | 'secondary' | 'outlined';
  size?: 'small' | 'medium' | 'large';
};

const MButton = (props: MButtonProps): JSX.Element => {
  const { title, onPress, children, loading, disabled, theme = 'primary', size = 'large' } = props;

  const bgColor = {
    primary: 'bg-red-500',
    secondary: 'bg-gray-300',
    outlined: 'bg-transparent',
  };

  const textColor = {
    primary: 'text-white',
    secondary: 'text-black',
    outlined: 'text-brand',
  };

  const spacing = {
    small: 'py-0.5 px-1',
    medium: 'py-1 px-2',
    large: 'py-2 px-4',
  };

  const wrapperClass = `${bgColor[theme]} ${textColor[theme]} ${spacing[size]} rounded-lg flex-row items-center justify-center`;
  const textWrapperClass = 'flex-row items-center justify-center';

  return (
    <TouchableOpacity className={wrapperClass} onPress={onPress} disabled={disabled}>
      {title && <Text className={`${textColor[theme]} font-semibold text-lg`}>{title}</Text>}
      {children && children}
    </TouchableOpacity>
  );
};

export default MButton;
