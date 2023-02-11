import {DateNumberDto} from './useGetCalanderWeek';

export const useGetCalanderWeekDate = (currentWeek: DateNumberDto[]) => {
  const firstDay = currentWeek[0];
  const lastDay = currentWeek[6];

  // TODO: 중복인 것 같다. 어떤 날 하루만 알 수 있다면 이전 주는 - 7
  // 여기서 7이아니라 3이 들어가면 3일전부터 3일 2일 1일 전을 구하는 공식이 될 것이다.
  // 즉 넘겨주는 인자만 변경해주면 된다.
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

  // console.log(prevWeekLastDateObject.getMonth(), 'prev');
  // console.log(nextWeekFirstDateObject.getMonth(), 'next');

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

  // console.log(prevWeekView.toLocaleString());
  // console.log(nextWeekView.toLocaleString());
  return {
    prevWeekLastDateObject,
    nextWeekFirstDateObject,
    prevWeekView,
    nextWeekView,
  };
};
