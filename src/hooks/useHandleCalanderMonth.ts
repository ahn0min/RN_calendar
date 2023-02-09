import {useState} from 'react';
import {transformDateIntoNumberData} from '../utils/transformDateIntoNumberData';

interface IUseCalenaderProps {
  currentDate: Date;
  location: 'en-US' | 'ko-KR' | undefined;
  toLocaleDateStringOptions: Intl.DateTimeFormatOptions;
}

export const useHandleCalanderMonth = ({
  currentDate,
  location,
  toLocaleDateStringOptions,
}: IUseCalenaderProps) => {
  const {
    fullYear: currentFullYear,
    month: currentMonth,
    date: currentNumberDate,
  } = transformDateIntoNumberData(currentDate);

  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    fullYear: currentFullYear,
    month: currentMonth,
    date: currentNumberDate,
  });

  const [viewDate, setViewDate] = useState<Date>(currentDate);

  const {fullYear, month, date, day} = transformDateIntoNumberData(viewDate);
  const monthWithLocale = viewDate.toLocaleDateString(
    location,
    toLocaleDateStringOptions,
  );

  const changePrevMonth = () => {
    setViewDate(new Date(fullYear, month - 2));
  };
  const changeNextMonth = () => {
    setViewDate(new Date(fullYear, month));
  };

  const changeSelectedDateOrViewDate: ChangeSelectedDateOrViewDateFunction = ({
    currentDateObject,
    changeableDateObject,
  }) => {
    if (currentDateObject.month == changeableDateObject.month) {
      return setSelectedDate({...changeableDateObject});
    }

    setSelectedDate({...changeableDateObject});
    setViewDate(
      new Date(
        changeableDateObject.fullYear,
        changeableDateObject.month - 1,
        changeableDateObject.date,
      ),
    );
  };

  return {
    viewDate,
    selectedDate,
    fullYear,
    monthWithNumber: month,
    monthWithLocale,
    date,
    day,
    changePrevMonth,
    changeNextMonth,
    changeSelectedDateOrViewDate,
  };
};

export type ChangeSelectedDateOrViewDateFunction = ({
  currentDateObject,
  changeableDateObject,
}: ChangeSelectedDateOrViewDateFunctionParameter) => void;

export type SelectedDate = {
  fullYear: number;
  month: number;
  date: number;
};

type ChangeSelectedDateOrViewDateFunctionParameter = {
  currentDateObject: SelectedDate;
  changeableDateObject: SelectedDate;
};
