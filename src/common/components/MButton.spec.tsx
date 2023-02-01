import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import MButton, { MButtonProps } from './MButton';

describe('MButton', () => {
  const Component = (props: MButtonProps) => <MButton testID="button" {...props} />;
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByTestId('button')).toBeTruthy();
  });
  it('renders title', () => {
    render(<Component title="Test" />);
    expect(screen.getByText('Test')).toBeTruthy();
  });
  it('calls onPress', () => {
    const onPress = jest.fn();
    render(<Component onPress={onPress} />);
    fireEvent.press(screen.getByTestId('button'));
    expect(onPress).toBeCalled();
  });
  it("doesn't call onPress", () => {
    const onPress = jest.fn();
    render(<Component onPress={onPress} disabled />);
    fireEvent.press(screen.getByTestId('button'));
    expect(onPress).not.toBeCalled();
  });
});
