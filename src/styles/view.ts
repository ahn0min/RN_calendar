import {StyleProp, ViewStyle} from 'react-native/types';

export const viewStyle = {
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as StyleProp<ViewStyle>,
} as const;
