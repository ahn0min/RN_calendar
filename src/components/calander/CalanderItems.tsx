import type {ReactNode} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import colors from '../../styles/colors';

interface ICalanderDayItemProps {
  children: ReactNode;
  isHoliday: boolean;
}

export const CalanderDayItem = ({
  isHoliday,
  children,
}: ICalanderDayItemProps) => {
  const holiDayStyle = isHoliday ? style.holiDay : {};
  return (
    <View>
      <Text style={holiDayStyle}>{children}</Text>
    </View>
  );
};

interface ICalanderDateItemProps {
  children: ReactNode;
  isSelected: boolean;
  isCurrentMonth: boolean;
  isHoliday: boolean;
  onPressOut: () => void;
}

export const CalanderDateItem = ({
  children,
  isSelected,
  isCurrentMonth,
  isHoliday,
  onPressOut,
}: ICalanderDateItemProps) => {
  const selectedStyle = isSelected
    ? {...style.calanderItem, ...style.selectedItem}
    : style.calanderItem;

  const monthDateStyle = !isCurrentMonth ? style.otherMonthDate : {};
  const holiDayStyle = isHoliday ? style.holiDay : {};

  return (
    <TouchableOpacity style={selectedStyle} onPressOut={onPressOut}>
      <Text style={{...monthDateStyle, ...holiDayStyle}}>{children}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  calanderItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  selectedItem: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.icons.red,
  },
  otherMonthDate: {
    opacity: 0.4,
  },
  holiDay: {
    color: colors.calander.holiday,
  },
});
