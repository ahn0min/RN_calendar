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

// 스크롤 이벤트가 발생했을 때 어느정도 움직이면 스크롤바를 통째로 다음 페이지로 바꿔준다.
