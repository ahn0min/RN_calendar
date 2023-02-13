import type {ReactNode} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';

interface IProps {
  children: ReactNode;
}

export const CalanderRow = ({children}: IProps) => {
  const {width} = useWindowDimensions();

  const getStyleSheet = () => {
    return StyleSheet.create({
      calanderRowView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        width,
        padding: 5,
      },
    });
  };
  return <View style={getStyleSheet().calanderRowView}>{children}</View>;
};
