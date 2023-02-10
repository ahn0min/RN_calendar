import {useEffect, useMemo, useState} from 'react';
import {Text, useWindowDimensions, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
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
export const CalanderWeek = ({
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

  const [isPrevLoading, setIsPrevLoading] = useState(false);
  const [isNextLoading, setIsNextLoading] = useState(false);

  const currentViewWeek = useMemo(
    () => calanderWeeks[viewWeekIndex],
    [viewWeekIndex],
  );

  console.log(viewWeekIndex);
  // const currentViewWeek = calanderWeeks[viewWeekIndex];

  const {prevWeekView, nextWeekView} = useGetCalanderWeekDate(currentViewWeek);
  const {width, height} = useWindowDimensions();

  const defaultTranslateX = -width * 0.9;
  const translateXY = useSharedValue({
    translateX: defaultTranslateX,
  });
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(translateXY.value.translateX),
          // translateX: withTiming(translateXY.value.translateX, {duration: 100}),
        },
      ],
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(() => console.log('begin'))
    .onUpdate(({translationX, translationY}) => {
      translateXY.value = {
        translateX: translationX + defaultTranslateX,
        // translateX: translationX,
      };
    })
    .onEnd(({translationX}) => {
      // translateXY.value = {
      //   translateX: defaultTranslateX,
      // };
      if (translationX > 40) {
        translateXY.value = {
          translateX: 0,
        };
        return runOnJS(setIsPrevLoading)(true);
      }
      if (translationX < -40) {
        translateXY.value = {
          translateX: 0,
        };
        // translateXY.value = {
        //   translateX: defaultTranslateX * 2,
        // };
        return runOnJS(setIsNextLoading)(true);
      }
    });

  useEffect(() => {
    // console.log(isPrevLoading);
    if (isPrevLoading) {
      // console.log('start');
      setIsPrevLoading(false);
      changeViewWeekIndexOnLeftSwipe();
    }
  }, [isPrevLoading]);

  useEffect(() => {
    // console.log('start');
    // console.log(isNextLoading);
    if (isNextLoading) {
      // console.log('start');
      setIsNextLoading(false);
      changeViewWeekIndexOnRightSwipe();
    }
  }, [isNextLoading]);

  // console.log(prevWeekView[6].toLocaleDateString());
  // console.log(currentViewWeek[6].date);
  // console.log(nextWeekView[0].toLocaleDateString());

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={
          [
            // {flexDirection: 'row'},
            // translateStyle,
          ]
        }>
        <CalanderRow>
          <Text>pre</Text>
          {prevWeekView?.map(Date => (
            <CalanderDayItem
              key={`${Date.getMonth() + 1}_${Date.getDate()}`}
              isSaturday
              isHoliday>
              {Date.getDate()}
            </CalanderDayItem>
          ))}
        </CalanderRow>
        <CalanderRow>
          {currentViewWeek?.map(Date => (
            <CalanderDayItem
              key={`${Date.month}_${Date.date}`}
              isSaturday
              isHoliday>
              {Date.date}
            </CalanderDayItem>
          ))}
        </CalanderRow>
        <CalanderRow>
          {/* {nextViewWeek?.map(Date => (
            <CalanderDayItem
              key={`${Date.month}_${Date.date}`}
              isSaturday
              isHoliday>
              {Date.date}
            </CalanderDayItem>
          ))} */}
          {nextWeekView?.map(Date => (
            <CalanderDayItem
              key={`${Date.getMonth() + 1}_${Date.getDate()}`}
              isSaturday
              isHoliday>
              {Date.getDate()}
            </CalanderDayItem>
          ))}
        </CalanderRow>
        {/* </View> */}
      </Animated.View>
    </GestureDetector>
  );
};
