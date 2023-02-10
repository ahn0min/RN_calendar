import {DateNumberDto} from './useGetCalanderWeek';

export const useGetCalanderWeekDate = (currentWeek: DateNumberDto[]) => {
  const firstDay = currentWeek[0];
  const lastDay = currentWeek[6];

  const prevWeekLastDateObject = new Date(
    firstDay.fullYear,
    firstDay.month - 1,
    firstDay.date - 7,
  );

  const nextWeekFirstDateObject = new Date(
    lastDay.fullYear,
    lastDay.month - 1,
    lastDay.date + 1,
  );

  console.log(prevWeekLastDateObject.getMonth(), 'prev');
  console.log(nextWeekFirstDateObject.getMonth(), 'next');

  const getPrevWeekView = (prevWeekLastDateObject: Date) => {
    return Array(7)
      .fill(null)
      .map((_, index) => {
        return new Date(
          prevWeekLastDateObject.getFullYear(),
          prevWeekLastDateObject.getMonth(),
          prevWeekLastDateObject.getDate() + index,
        );
      });
  };

  const getNextWeekView = (nextWeekFirstDateObject: Date) => {
    return Array(7)
      .fill(null)
      .map((_, index) => {
        return new Date(
          nextWeekFirstDateObject.getFullYear(),
          nextWeekFirstDateObject.getMonth(),
          nextWeekFirstDateObject.getDate() + index,
        );
      });
  };

  const prevWeekView = getPrevWeekView(prevWeekLastDateObject);
  const nextWeekView = getNextWeekView(nextWeekFirstDateObject);

  console.log(prevWeekView.toLocaleString());
  console.log(nextWeekView.toLocaleString());
  return {
    prevWeekLastDateObject,
    nextWeekFirstDateObject,
    prevWeekView,
    nextWeekView,
  };
};
