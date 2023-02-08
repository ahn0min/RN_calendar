import {StyleSheet, View} from 'react-native';
import {useMemo} from 'react';

import {CalanderItem} from './CalanderItem';
import {CalanderRow} from './CalanderRow';
import {useGetCalanderWeek} from '../../hooks/useGetCalanderWeek';
import {viewStyle} from '../../styles/view';

const dayNamesKR = ['일', '월', '화', '수', '목', '금', '토'] as const;

interface ICalanderProps {
  selectedDate: Date;
}

export const Calander = ({selectedDate}: ICalanderProps) => {
  const calanderDays = useGetCalanderWeek(selectedDate);
  const caladerDateNames = useMemo(
    () =>
      dayNamesKR.map(dayNameKR => (
        <CalanderItem key={dayNameKR} isSelected={false}>
          {dayNameKR}
        </CalanderItem>
      )),
    dayNamesKR,
  );

  const renderCalanderDays = () => {
    return calanderDays.map(dates => (
      <CalanderRow>
        {dates.map(date => (
          <CalanderItem isSelected={false}>{date.date}</CalanderItem>
        ))}
      </CalanderRow>
    ));
  };

  return (
    <View>
      <View>
        <CalanderRow>{caladerDateNames}</CalanderRow>
        <View>{renderCalanderDays()}</View>
      </View>
    </View>
  );
};
