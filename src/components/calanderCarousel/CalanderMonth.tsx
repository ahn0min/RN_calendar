import {useMemo} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';

import {DateNumberDto} from '../../hooks/new/useGetCalanderWeek';
import {SelectedDate} from '../../hooks/useHandleCalanderMonth';
import {CalanderWeek} from './CalanderWeek';

interface IProps {
  monthDate: DateNumberDto[][];
  viewDate: Date;
  selectedDate: SelectedDate;
  changeSelectedDateOrViewDate: (date: Date) => void;
}

export const CalanderMonth = ({
  monthDate,
  viewDate,
  selectedDate,
  changeSelectedDateOrViewDate,
}: IProps) => {
  const {width} = useWindowDimensions();

  const style = useMemo(
    () =>
      StyleSheet.create({
        calanderMonthContainer: {
          width,
          height: 400,
          alignContent: 'space-between',
          justifyContent: 'space-between',
        },
      }),
    [width],
  );

  return (
    <View style={style.calanderMonthContainer}>
      {monthDate.map(weekDate => (
        <CalanderWeek
          key={`${weekDate[0].month}_${weekDate[0].date}_${
            weekDate[weekDate.length - 1].month
          }`}
          weekDate={weekDate}
          viewDate={viewDate}
          selectedDate={selectedDate}
          changeSelectedDateOrViewDate={changeSelectedDateOrViewDate}
        />
      ))}
    </View>
  );
};
