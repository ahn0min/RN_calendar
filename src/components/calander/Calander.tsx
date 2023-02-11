import {StyleSheet, View} from 'react-native';
import {useEffect, useMemo, useRef, useState} from 'react';

import {CalanderDateItem, CalanderDayItem} from './CalanderItems';
import {CalanderRow} from './CalanderRow';
import {useGetCalanderWeek} from '../../hooks/useGetCalanderWeek';
import {
  ChangeSelectedDateOrViewDateFunction,
  SelectedDate,
} from '../../hooks/useHandleCalanderMonth';
import {transformDateIntoNumberData} from '../../utils/transformDateIntoNumberData';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {CalanderWeek} from './CalanderWeek';
import {CalanderSwipable} from './CalanderSwipable';

const dayNamesKR = ['일', '월', '화', '수', '목', '금', '토'] as const;

interface ICalanderProps {
  viewDate: Date;
  selectedDate: SelectedDate;
  changePrevMonth: () => void;
  changeNextMonth: () => void;
  changeSelectedDateOrViewDate: ChangeSelectedDateOrViewDateFunction;
}

export const Calander = ({
  viewDate,
  selectedDate,
  changePrevMonth,
  changeNextMonth,
  changeSelectedDateOrViewDate,
}: ICalanderProps) => {
  const calanderWeeks = useGetCalanderWeek(viewDate);
  const caladerDateNameElements = useMemo(
    () =>
      dayNamesKR.map((dayNameKR, index) => (
        <CalanderDayItem
          key={dayNameKR}
          isHoliday={index === 0}
          isSaturday={index === 6}>
          {dayNameKR}
        </CalanderDayItem>
      )),
    dayNamesKR,
  );

  const renderCalanderDays = () => {
    return calanderWeeks.map((calanderWeek, index) => (
      <CalanderRow key={index}>
        {calanderWeek.map(calanderDay => {
          const {
            fullYear: currentViewFullYear,
            month: currentViewMonth,
            date: currentViewDate,
          } = transformDateIntoNumberData(viewDate);

          const isCurrentMonth = calanderDay.month === currentViewMonth;
          const isHoliday = calanderDay.day === 0;
          const isSaturday = calanderDay.day === 6;
          const isSelected =
            calanderDay.fullYear === selectedDate.fullYear &&
            calanderDay.month === selectedDate.month &&
            calanderDay.date === selectedDate.date;

          const onPressOut = () =>
            changeSelectedDateOrViewDate({
              currentDateObject: {
                fullYear: currentViewFullYear,
                month: currentViewMonth,
                date: currentViewDate,
              },
              changeableDateObject: {
                fullYear: calanderDay.fullYear,
                month: calanderDay.month,
                date: calanderDay.date,
              },
            });

          return (
            <CalanderDateItem
              key={`${calanderDay.month}_${calanderDay.date}`}
              onPressOut={onPressOut}
              isCurrentMonth={isCurrentMonth}
              isSelected={isSelected}
              isHoliday={isHoliday}
              isSaturday={isSaturday}>
              {calanderDay.date}
            </CalanderDateItem>
          );
        })}
      </CalanderRow>
    ));
  };

  const horizontal = useSharedValue({horizontal: 'true'});
  const offset = useSharedValue({x: 0, y: 0});
  const backgroundColor = useSharedValue({color: 'red'});
  const animationStyle = useAnimatedStyle(() => ({
    horizontal: horizontal.value,
    transform: [{translateX: offset.value.x}, {translateY: offset.value.y}],
    backgroundColor: backgroundColor.value.color,
  }));

  const scrollViewAttributes = {horizontal: false};

  const gesture = Gesture.Pan()
    .onBegin(() => {})
    .onStart(() => {
      scrollViewAttributes.horizontal = true;
    })
    .onUpdate(props => {
      // translationY 만큼 이동해줘도 될 것 같다.
      offset.value = {
        x: props.translationX,
        y: props.translationY,
      };
    })
    .onEnd(() => {
      // console.log('end');
    });

  return (
    <GestureDetector gesture={gesture}>
      <View style={style.calanderSection}>
        <CalanderRow>{caladerDateNameElements}</CalanderRow>
        <Animated.ScrollView horizontal={scrollViewAttributes.horizontal}>
          {renderCalanderDays()}
          {/* <CalanderWeek
            viewDate={viewDate}
            changePrevMonth={changePrevMonth}
            changeNextMonth={changeNextMonth}
            // changeSelectedDateOrViewDate={changeSelectedDateOrViewDate}
          /> */}
          <View style={{height: 50}} />
          <CalanderSwipable
            viewDate={viewDate}
            changePrevMonth={changePrevMonth}
            changeNextMonth={changeNextMonth}
          />
        </Animated.ScrollView>
        {/* </Animated.ScrollView> */}
      </View>
    </GestureDetector>
  );
};

const style = StyleSheet.create({
  calanderSection: {
    margin: '5%',
  },
  calanderSlider: {
    flexDirection: 'column',
    overflow: 'scroll',
  },
});
