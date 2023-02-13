import {useEffect, useState} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

import {transformDateIntoNumberData} from '../utils/transformDateIntoNumberData';

const WEEK_DAYS_NUMBER = 7;
const todayDate = new Date();

interface IProps {
  prevSelectedDate?: Date;
}
export const useWeeklyCarouselCalander = ({prevSelectedDate}: IProps) => {
  const [currentDate, setCurrentDate] = useState(prevSelectedDate || todayDate);
  const [selectedDate, setSelectedDate] = useState(
    prevSelectedDate || todayDate,
  );

  const {fullYear, month, date, day} = transformDateIntoNumberData(currentDate);

  const prevWeekFirstDate = new Date(
    fullYear,
    month - 1,
    date - (WEEK_DAYS_NUMBER + day),
  );
  const currentWeekFirstDate = new Date(fullYear, month - 1, date - day);
  const nextWeekFirstDate = new Date(
    fullYear,
    month - 1,
    date + (WEEK_DAYS_NUMBER - day),
  );

  const carouselWeeksFirstDates = [
    prevWeekFirstDate,
    currentWeekFirstDate,
    nextWeekFirstDate,
  ];

  useEffect(() => {
    prevSelectedDate && setCurrentDate(prevSelectedDate);
  }, [prevSelectedDate]);

  const getWeekDates = (weekFirstDate: Date) => {
    return Array(WEEK_DAYS_NUMBER)
      .fill(null)
      .map((date, index) => {
        return new Date(
          weekFirstDate.getFullYear(),
          weekFirstDate.getMonth(),
          weekFirstDate.getDate() + index,
        );
      });
  };

  const prevWeekDates = getWeekDates(prevWeekFirstDate);
  const currentWeekDates = getWeekDates(currentWeekFirstDate);
  const nextWeekDates = getWeekDates(nextWeekFirstDate);

  const transforedPrevWeekDatesViewDate = prevWeekDates?.map(date =>
    transformDateIntoNumberData(date),
  );
  const transforedCurrentWeekDatesViewDate = currentWeekDates?.map(date =>
    transformDateIntoNumberData(date),
  );
  const transforedNextWeekDatesViewDate = nextWeekDates?.map(date =>
    transformDateIntoNumberData(date),
  );
  const [carouselWeeks, setCarouselWeeks] = useState([
    transforedPrevWeekDatesViewDate,
    transforedCurrentWeekDatesViewDate,
    transforedNextWeekDatesViewDate,
  ]);

  useEffect(() => {
    setCarouselWeeks([
      transforedPrevWeekDatesViewDate,
      transforedCurrentWeekDatesViewDate,
      transforedNextWeekDatesViewDate,
    ]);
  }, [currentDate]);

  const changeCurrentDateIntoPrevDate = () => setCurrentDate(prevWeekFirstDate);
  const changeCurrentDateIntoNextDate = () => setCurrentDate(nextWeekFirstDate);
  const changeSelectedDate = (date: Date) => {
    if (date.getMonth() !== currentDate.getMonth()) {
      setCurrentDate(date);
      return setSelectedDate(date);
    }

    return setSelectedDate(date);
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
    if (pageNum === carouselWeeks.length - 1) {
      return changeCurrentDateIntoNextDate();
    }
  };

  return {
    currentDate,
    selectedDate,
    carouselWeeks,
    carouselWeeksFirstDates,
    changeSelectedDate,
    changeCurrentDateIntoPrevDate,
    changeCurrentDateIntoNextDate,
    handleCurrentDateOnNativeScroll,
  };
};
