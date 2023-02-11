import {useEffect, useMemo, useRef, useState} from 'react';
import {
  ListRenderItemInfo,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  scrollTo,
} from 'react-native-reanimated';
import {useGetCalanderWeek} from '../../hooks/useGetCalanderWeek';
import {useGetCalanderWeekDate} from '../../hooks/useGetCalanderWeekDate';
import {useWeeklyCalander} from '../../hooks/useWeeklyCalander';
import {CalanderDayItem} from './CalanderItems';
import {CalanderRow} from './CalanderRow';

export interface ICalanderWeekProps {
  viewDate: Date;
  changePrevMonth: () => void;
  changeNextMonth: () => void;
  // changeSelectedDateOrViewDate: ChangeSelectedDateOrViewDateFunction;
}

export const CalanderSwipable = ({
  viewDate,
  changePrevMonth,
  changeNextMonth,
}: ICalanderWeekProps) => {
  const calanderWeeks = useMemo(() => useGetCalanderWeek(viewDate), [viewDate]);
  const {
    viewWeekIndex,
    changeViewWeekIndexOnLeftSwipe,
    changeViewWeekIndexOnRightSwipe,
  } = useWeeklyCalander({calanderWeeks, changePrevMonth, changeNextMonth});

  // const [isPrevLoading, setIsPrevLoading] = useState(false);
  // const [isNextLoading, setIsNextLoading] = useState(false);

  const {width, height} = useWindowDimensions();

  const defaultTranslateX = -width * 0.9;
  const translateXY = useSharedValue({
    translateX: defaultTranslateX,
  });

  const currentViewWeek = useMemo(
    () => calanderWeeks[viewWeekIndex],
    [viewWeekIndex],
  );

  const {prevWeekView, nextWeekView} = useGetCalanderWeekDate(currentViewWeek);

  const [weekList, setWeekList] = useState([
    prevWeekView.map(date => ({
      fullYear: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
    })),
    currentViewWeek,
    nextWeekView.map(date => ({
      fullYear: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
    })),
  ]);

  useEffect(() => {
    setWeekList(() => [
      prevWeekView.map(date => ({
        fullYear: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
      })),
      currentViewWeek,
      nextWeekView.map(date => ({
        fullYear: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
      })),
    ]);
  }, [currentViewWeek]);

  const defaultStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(0, {
            duration: 500,
            easing: Easing.out(Easing.exp),
          }),
        },
      ],
    };
  });

  const [initialScollIndex, setInitialScrollIndex] = useState(1);
  const animatedFlatListRef = useRef<FlatList>(null);

  useEffect(() => {
    animatedFlatListRef.current?.scrollToIndex({
      index: 1,
      animated: false,
    });
  }, [weekList]);

  const ReanimatedFlatList = Animated.createAnimatedComponent(FlatList);

  return (
    <View>
      <ReanimatedFlatList
        ref={animatedFlatListRef}
        style={defaultStyle}
        horizontal
        pagingEnabled
        getItemLayout={(data, index) => ({
          length: width * 0.9,
          offset: width * 0.9 * index,
          index,
        })}
        initialNumToRender={1}
        initialScrollIndex={initialScollIndex}
        onMomentumScrollEnd={e => {
          const {nativeEvent} = e;
          const {contentSize, contentOffset, layoutMeasurement} = nativeEvent;
          // 현재 보여지는 뷰포트의 size

          const pageNum = Math.floor(contentOffset.x / layoutMeasurement.width);

          if (pageNum === 0) {
            setInitialScrollIndex(1);
            return changeViewWeekIndexOnLeftSwipe();
          }

          if (pageNum === 2) {
            setInitialScrollIndex(1);
            return changeViewWeekIndexOnRightSwipe();
          }
        }}
        decelerationRate={'fast'}
        data={weekList}
        extraData={weekList}
        renderItem={({
          item,
        }: ListRenderItemInfo<
          {fullYear: number; month: number; date: number}[]
        >) => (
          <CalanderRow>
            {item?.map(Date => (
              <CalanderDayItem
                key={`${Date.month}_${Date.date}`}
                isSaturday
                isHoliday>
                {Date.date}
              </CalanderDayItem>
            ))}
          </CalanderRow>
        )}></ReanimatedFlatList>
    </View>
  );
};
