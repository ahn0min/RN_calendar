import {useEffect, useState} from 'react';

export interface IWeeklyCalanderProps {
  // viewDate: Date;
  calanderWeeks: {
    fullYear: number;
    month: number;
    date: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
  }[][];
  changePrevMonth: () => void;
  changeNextMonth: () => void;
  // changeSelectedDateOrViewDate: ChangeSelectedDateOrViewDateFunction;
}

export const useWeeklyCalander = ({
  calanderWeeks,
  changePrevMonth,
  changeNextMonth,
}: IWeeklyCalanderProps) => {
  const [viewWeekIndex, setViewWeekIndex] = useState(0);

  const prevViewWeekIndex = () =>
    setViewWeekIndex(currentViewWeek => currentViewWeek - 1);
  const nextViewWeekIndex = () =>
    setViewWeekIndex(currentViewWeek => currentViewWeek + 1);

  const changeViewWeekIndexOnLeftSwipe = () => {
    if (viewWeekIndex === 0) {
      return changePrevMonth();
    }
    prevViewWeekIndex();
  };
  const changeViewWeekIndexOnRightSwipe = () => {
    if (viewWeekIndex === calanderWeeks.length - 1) {
      return changeNextMonth();
    }
    nextViewWeekIndex();
  };

  useEffect(() => {
    // calanderWeeks가 변경되었을 때 변경된 시점의 viewWeekIndex가 0이라면 이전달이라면
    if (viewWeekIndex === 0) {
      return setViewWeekIndex(calanderWeeks.length - 1);
    }
    // 그렇지 않으면 다 다음달이다.
    return setViewWeekIndex(0);
  }, [calanderWeeks]);

  return {
    viewWeekIndex,
    changeViewWeekIndexOnLeftSwipe,
    changeViewWeekIndexOnRightSwipe,
  };
};
