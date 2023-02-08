import {useState} from 'react';

interface IUseCalenaderProps {
  newDate: Date;
  location: 'en-US' | 'kr';
  toLocaleDateStringOptions: Intl.DateTimeFormatOptions;
}

export const useCalander = ({
  newDate,
  location,
  toLocaleDateStringOptions,
}: IUseCalenaderProps) => {
  // 이 date자체를 기반으로 새로운 date를 만들어주자.
  const [selectedDate, setSelectedDate] = useState<Date>(newDate);

  // 각 연도와 월, 일 state 가 바뀌면 저절로 바뀌지 않을까?
  // TODO: dho getMonth + 1을 해주면 setState에서 - 2 혹은 그대로를 해야할까?
  const fullYear = selectedDate.getFullYear();
  const monthWithNumber = selectedDate.getMonth() + 1;
  const monthWithEng = selectedDate.toLocaleDateString(
    location,
    toLocaleDateStringOptions,
  );
  const date = selectedDate.getDate();
  const day = selectedDate.getDay();

  const changePrevMonth = () => {
    setSelectedDate(new Date(fullYear, monthWithNumber - 2));
  };
  const changeNextMonth = () => {
    setSelectedDate(new Date(fullYear, monthWithNumber));
  };

  return {
    selectedDate,
    fullYear,
    monthWithNumber,
    monthWithEng,
    date,
    day,
    changePrevMonth,
    changeNextMonth,
  };
};
