import {useEffect, useState} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

import {transformDateIntoNumberData} from '../../utils/transformDateIntoNumberData';
import {useGetCalanderWeek} from './useGetCalanderWeek';

const todayDate = new Date();

export const useMonthCarouselCalanders = () => {
  const [currentDate, setCurrentDate] = useState(todayDate);
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const {fullYear, month} = transformDateIntoNumberData(currentDate);

  // get prev next month
  const prevMonthFirstDate = new Date(fullYear, month - 2);
  const currentMonthFirstDate = new Date(fullYear, month - 1);
  const nextMonthFirstDate = new Date(fullYear, month);

  const carouselMonthsFirstDates = [
    prevMonthFirstDate,
    currentMonthFirstDate,
    nextMonthFirstDate,
  ];

  // get pre next month all date
  const transforedPrevMonthDatesViewDate =
    useGetCalanderWeek(prevMonthFirstDate);
  const transforedCurrentMonthDates = useGetCalanderWeek(currentMonthFirstDate);
  const transforedNextMonthDates = useGetCalanderWeek(nextMonthFirstDate);

  const [carouselMonths, setCarouselMonths] = useState([
    transforedPrevMonthDatesViewDate,
    transforedCurrentMonthDates,
    transforedNextMonthDates,
  ]);

  useEffect(() => {
    setCarouselMonths([
      transforedPrevMonthDatesViewDate,
      transforedCurrentMonthDates,
      transforedNextMonthDates,
    ]);
  }, [currentDate]);

  const changeCurrentDateIntoPrevDate = () =>
    setCurrentDate(prevMonthFirstDate);

  const changeCurrentDateIntoNextDate = () =>
    setCurrentDate(nextMonthFirstDate);

  const changeSelectedDate = (date: Date) => {
    // 중복 호출 제거
    if (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth()
    ) {
      return;
    }

    if (date.getMonth() !== currentDate.getMonth()) {
      setCurrentDate(date);
    }
    setSelectedDate(date);
  };

  const handleCurrentDateOnNativeScroll = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const {nativeEvent} = e;
    const {contentOffset, layoutMeasurement} = nativeEvent;
    const pageNum = Math.floor(contentOffset.x / layoutMeasurement.width);

    if (pageNum === 0) {
      return changeCurrentDateIntoPrevDate();
    }
    if (pageNum === carouselMonths.length - 1) {
      return changeCurrentDateIntoNextDate();
    }
  };

  return {
    currentDate,
    selectedDate,
    fullYear,
    month,
    carouselMonths,
    carouselMonthsFirstDates,
    changeSelectedDate,
    changeCurrentDateIntoPrevDate,
    changeCurrentDateIntoNextDate,
    handleCurrentDateOnNativeScroll,
  };
};
