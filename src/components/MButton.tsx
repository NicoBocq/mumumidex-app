import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

export type MButtonProps = {
  onPress?: () => void;
  title?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode | string;
  loading?: boolean;
  disabled?: boolean;
  theme?: Theme;
  variant?: Variant;
  size?: Size;
  style?: string;
};
export type Size = 'small' | 'medium' | 'large';
export type Theme = 'primary' | 'secondary';
export type Variant = 'ghost' | 'outline' | 'solid';

const MButton = (props: MButtonProps): JSX.Element => {
  const {
    title,
    onPress,
    children,
    loading,
    disabled,
    variant = 'solid',
    theme = 'primary',
    size = 'large',
    style,
  } = props;

  const bgColor = {
    primary: 'bg-brand',
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

  const wrapperStyle = tw.style(
    'rounded-lg flex-row items-center justify-center',
    style,
    bgColor[theme],
    spacing[size]
  );
  const textwrapperStyle = tw.style('flex-row items-center justify-center');
  const textStyle = tw.style('text-white font-semibold text-lg', textColor[theme]);

  return (
    <TouchableOpacity style={wrapperStyle} onPress={onPress} disabled={disabled}>
      {title && <Text style={textStyle}>{title}</Text>}
      {children && children}
    </TouchableOpacity>
  );
};

export default MButton;
