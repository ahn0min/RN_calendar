import {StyleSheet, View} from 'react-native';
import {useMemo} from 'react';

import {CalanderDateItem, CalanderDayItem} from './CalanderItems';
import {CalanderRow} from './CalanderRow';
import {useGetCalanderWeek} from '../../hooks/useGetCalanderWeek';
import {
  ChangeSelectedDateOrViewDateFunction,
  SelectedDate,
} from '../../hooks/useHandleCalanderMonth';
import {transformDateIntoNumberData} from '../../utils/transformDateIntoNumberData';

const dayNamesKR = ['일', '월', '화', '수', '목', '금', '토'] as const;

interface ICalanderProps {
  viewDate: Date;
  selectedDate: SelectedDate;
  changeSelectedDateOrViewDate: ChangeSelectedDateOrViewDateFunction;
}

export const Calander = ({
  viewDate,
  selectedDate,
  changeSelectedDateOrViewDate,
}: ICalanderProps) => {
  const calanderWeeks = useGetCalanderWeek(viewDate);
  const caladerDateNameElements = useMemo(
    () =>
      dayNamesKR.map((dayNameKR, index) => (
        <CalanderDayItem key={dayNameKR} isHoliday={index === 0}>
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
              isHoliday={isHoliday}>
              {calanderDay.date}
            </CalanderDateItem>
          );
        })}
      </CalanderRow>
    ));
  };

  return (
    <View style={style.calanderSection}>
      <CalanderRow>{caladerDateNameElements}</CalanderRow>
      <View>{renderCalanderDays()}</View>
    </View>
  );
};

const style = StyleSheet.create({
  calanderSection: {
    margin: '5%',
  },
});
