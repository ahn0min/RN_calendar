import {DateNumberDto} from '../../hooks/new/useGetCalanderWeek';
import {SelectedDate} from '../../hooks/useHandleCalanderMonth';
import {transformDateIntoNumberData} from '../../utils/transformDateIntoNumberData';
import {CalanderDateItem} from './CalanderItems';
import {CalanderRow} from './CalanderRow';

interface IProps {
  weekDate: DateNumberDto[];
  viewDate: Date;
  selectedDate: SelectedDate;
  changeSelectedDateOrViewDate: (date: Date) => void;
}
export const CalanderWeek = ({
  weekDate,
  viewDate,
  selectedDate,
  changeSelectedDateOrViewDate,
}: IProps) => {
  return (
    <CalanderRow>
      {weekDate.map(dayDate => {
        const {month: currentViewMonth} = transformDateIntoNumberData(viewDate);

        const isHoliday = dayDate.day === 0;
        const isSaturday = dayDate.day === 6;
        const isCurrentMonth = dayDate.month === currentViewMonth;
        const isSelected =
          dayDate.fullYear === selectedDate.fullYear &&
          dayDate.month === selectedDate.month &&
          dayDate.date === selectedDate.date;

        const onPress = () =>
          changeSelectedDateOrViewDate(
            new Date(dayDate.fullYear, dayDate.month - 1, dayDate.date),
          );

        return (
          <CalanderDateItem
            key={`${dayDate.month}_${dayDate.date}_${isCurrentMonth}`}
            isSelected={isSelected}
            isCurrentMonth={isCurrentMonth}
            isHoliday={isHoliday}
            isSaturday={isSaturday}
            onPress={onPress}>
            {dayDate.date}
          </CalanderDateItem>
        );
      })}
    </CalanderRow>
  );
};
