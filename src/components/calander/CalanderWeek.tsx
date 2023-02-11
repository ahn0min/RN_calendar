import {useEffect, useMemo, useState} from 'react';
import {Alert, Text, useWindowDimensions, View} from 'react-native';
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

  // const currentViewWeek = calanderWeeks[viewWeekIndex];
  // 이걸 state로 해서 붙인다.
  // [1, 2, 3]
  // 왼쪽으로 드래그 했을 때 [0, 1, 2] 로 바뀔 것이다.
  // 오른쪽으로 드래그했을때는 [2, 3, 4]로 바뀔 것이다.

  // 처음에는 2번을 보여주고 있다 (33)
  // 드래그하면 33 - translationX하고 끝나면 0으로 바꿔준다.
  // 0으로 바뀌면 그 때 새롭게 그린다.

  // 처음에 2번을 보여준다.
  // 드래그하면 33 + translationX하고 끝나면 66으로 바꿔준다.
  // 66으로 바뀌고 나면 그 때 새롭게 그린다.

  // 새롭게 그리고 translationX를 다시 초기화 해준다.

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
          // translateX: translateXY.value.translateX,
          // translateX: withSpring(translateXY.value.translateX),
          translateX: withTiming(translateXY.value.translateX, {duration: 400}),
        },
      ],
    };
  });
  const defaultTranslateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateXY.value.translateX,
        },
      ],
    };
  });
  // 효과를 해지해 주면 된다.

  //TODO:  PAN 제스쳐도 훅으로 뺄 수 있지 않을까?
  const gesture = Gesture.Pan()
    .onBegin(() => console.log('begin'))
    .onUpdate(({translationX, translationY}) => {
      translateXY.value = {
        translateX: translationX + defaultTranslateX,
        // translateX: translationX,
      };
    })
    .onEnd(({translationX}) => {
      translateXY.value = {
        // translateX: 0,
        translateX: defaultTranslateX,
      };
      // TODO: 40을 상수로 빼주자
      if (translationX > 40) {
        translateXY.value = {
          translateX: 0,
          // translateX: defaultTranslateX,
        };
        return runOnJS(setIsPrevLoading)(true);
      }
      if (translationX < -40) {
        translateXY.value = {
          translateX: defaultTranslateX * 2,
        };
        // translateXY.value = {
        //   translateX: defaultTranslateX * 2,
        // };
        return runOnJS(setIsNextLoading)(true);
      }
    });
  // .onFinalize(({translationX, absoluteX}) => {
  //   runOnJS(Alert.alert)('end');
  // });

  console.log(currentViewWeek.toLocaleString());
  useEffect(() => {
    if (isPrevLoading) {
      setTimeout(() => {
        // translateXY.value = {translateX: defaultTranslateX};
        changeViewWeekIndexOnLeftSwipe();
        setIsPrevLoading(false);
      }, 300);
    }
  }, [isPrevLoading]);

  useEffect(() => {
    if (isNextLoading) {
      setTimeout(() => {
        // translateXY.value = {translateX: defaultTranslateX};
        changeViewWeekIndexOnRightSwipe();
        setIsNextLoading(false);
      }, 300);
    }
  }, [isNextLoading]);

  return (
    <View>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {flexDirection: 'row'},
            isNextLoading || isPrevLoading
              ? defaultTranslateStyle
              : translateStyle,
          ]}>
          <CalanderRow>
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
        {/* <Gesture */}
      </GestureDetector>
      <Text>{translateXY.value.translateX}</Text>
      <Text>{currentViewWeek[0].date}</Text>
      <Text>{translateStyle.transform?.[0].translateX}</Text>
    </View>
  );
};
