import type {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface IProps {
  children: ReactNode;
  isSelected: boolean;
}

//TODO: style을 합쳐주는 classNames 같은 함수를 만들기

export const CalanderItem = ({children, isSelected}: IProps) => {
  return (
    <View
      style={
        isSelected
          ? {...style.calanderItem, ...style.selectedItem}
          : style.calanderItem
      }>
      <Text>{children}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  calanderItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  selectedItem: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'blue',
  },
});
