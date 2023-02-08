import {useState} from 'react';
import {transformDateIntoNumberData} from '../utils/transformDateIntoNumberData';

interface IUseCalenaderProps {
  newDate: Date;
  location: 'en-US' | 'ko-KR' | undefined;
  toLocaleDateStringOptions: Intl.DateTimeFormatOptions;
}

export const useHandleCalanderMonth = ({
  newDate,
  location,
  toLocaleDateStringOptions,
}: IUseCalenaderProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(newDate);

  const {fullYear, month, date, day} =
    transformDateIntoNumberData(selectedDate);

  const monthWithLocale = selectedDate.toLocaleDateString(
    location,
    toLocaleDateStringOptions,
  );

  const changePrevMonth = () => {
    setSelectedDate(new Date(fullYear, month - 2));
  };
  const changeNextMonth = () => {
    setSelectedDate(new Date(fullYear, month));
  };

  return {
    selectedDate,
    fullYear,
    monthWithNumber: month,
    monthWithLocale,
    date,
    day,
    changePrevMonth,
    changeNextMonth,
  };
};
