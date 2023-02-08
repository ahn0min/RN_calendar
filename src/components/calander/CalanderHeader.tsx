import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import Icons from '../common/Icons';

interface ICalanderProps {
  fullYear: number;
  monthWithLocale: string;
  changePrevMonth: () => void;
  changeNextMonth: () => void;
}

export const CalanderHeader = ({
  fullYear,
  monthWithLocale,
  changePrevMonth,
  changeNextMonth,
}: ICalanderProps) => {
  return (
    <View style={style.header}>
      <TouchableOpacity onPress={changePrevMonth}>
        {Icons.ChevronLeft(style.chevron)}
      </TouchableOpacity>
      <Text style={style.dateText}>{`${monthWithLocale} ${fullYear}`}</Text>
      <TouchableOpacity onPress={changeNextMonth}>
        {Icons.ChevronRight(style.chevron)}
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  dateText: {
    flexBasis: '50%',
    textAlign: 'center',
  },
  chevron: {size: 20, color: colors.icons.red},
});
