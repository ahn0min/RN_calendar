import {useRef} from 'react';
import {FlatList} from 'react-native';

type ScrollToIndexParams = {
  animated?: boolean | null | undefined;
  index: number;
  viewOffset?: number | undefined;
  viewPosition?: number | undefined;
};

export function useAnimatedFlatListScrollToIndex<T>() {
  const animatedFlatListRef = useRef<FlatList<T>>(null);

  const handleScrollToIndex = (params: ScrollToIndexParams) => {
    animatedFlatListRef.current?.scrollToIndex(params);
  };

  return {
    animatedFlatListRef,
    handleScrollToIndex,
  };
}
