import type {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

interface IProps {
  children: ReactNode;
}

export const CalanderRow = ({children}: IProps) => {
  return <View style={style.calanderRowView}>{children}</View>;
};

const style = StyleSheet.create({
  calanderRowView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
