import type {ReactNode} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import colors from '../../styles/colors';

interface ICalanderDayItemProps {
  children: ReactNode;
  isSaturday: boolean;
  isHoliday: boolean;
}

export const CalanderDayItem = ({
  children,
  isSaturday,
  isHoliday,
}: ICalanderDayItemProps) => {
  const holidayStyle = isHoliday ? style.holiday : {};
  const sundayStyle = isSaturday ? style.saturday : {};
  return (
    <View>
      <Text style={{...holidayStyle, ...sundayStyle}}>{children}</Text>
    </View>
  );
};

interface ICalanderDateItemProps {
  children: ReactNode;
  isSelected: boolean;
  isCurrentMonth: boolean;
  isHoliday: boolean;
  isSaturday: boolean;
  onPressOut: () => void;
}

export const CalanderDateItem = ({
  children,
  isSelected,
  isCurrentMonth,
  isHoliday,
  isSaturday,
  onPressOut,
}: ICalanderDateItemProps) => {
  const selectedStyle = isSelected
    ? {...style.calanderItem, ...style.selectedItem}
    : style.calanderItem;

  const monthDateStyle = !isCurrentMonth ? style.otherMonthDate : {};
  const holidayStyle = isHoliday ? style.holiday : {};
  const saturdayStyle = isSaturday ? style.saturday : {};

  return (
    <TouchableOpacity style={selectedStyle} onPressOut={onPressOut}>
      <Text style={{...monthDateStyle, ...holidayStyle, ...saturdayStyle}}>
        {children}
      </Text>
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
  holiday: {
    color: colors.calander.holiday,
  },
  saturday: {
    color: colors.calander.saturday,
  },
});
