import {transformDateIntoNumberData} from '../utils/transformDateIntoNumberData';

export const useGetCalanderWeek = (date: Date) => {
  const {fullYear, month} = transformDateIntoNumberData(date);

  // TODO: 함수로 분리하기
  const prevMonthLastDateObject = new Date(fullYear, month - 1, 0);
  const prevMonthLastDay = prevMonthLastDateObject.getDay();

  const currentMonthFirstDateObject = new Date(fullYear, month - 1, 1);
  const currentMonthFirstDay = currentMonthFirstDateObject.getDay();

  const calanderFirstDateObject =
    currentMonthFirstDay === 0
      ? currentMonthFirstDateObject
      : currentMonthFirstDay === 1
      ? prevMonthLastDateObject
      : new Date(fullYear, month - 1, -prevMonthLastDay);

  const monthDateObjects: ReturnType<typeof transformDateIntoNumberData>[] =
    Array.from({length: 42}, (_, index) =>
      transformDateIntoNumberData(
        new Date(
          calanderFirstDateObject.getFullYear(),
          calanderFirstDateObject.getMonth(),
          calanderFirstDateObject.getDate() + index,
        ),
      ),
    );

  // TODO: 함수로 분리하기
  const firstWeek = monthDateObjects.slice(0, 7);
  const secondWeek = monthDateObjects.slice(7, 14);
  const thirdWeek = monthDateObjects.slice(14, 21);
  const fourthWeek = monthDateObjects.slice(21, 28);
  const fifthWeek = monthDateObjects.slice(28, 35);
  const sixthWeek = monthDateObjects.slice(35);

  const fourthWeekLastDate = fourthWeek[fourthWeek.length - 1];
  const fifthWeekLastDate = fifthWeek[fifthWeek.length - 1];

  const currentMonthLastDateObject = new Date(fullYear, month, 0);
  const currentMonthLastDate = currentMonthLastDateObject.getDate();

  // TODO: 함수로 분리하기
  if (
    fourthWeekLastDate.month !== month ||
    fourthWeekLastDate.date >= currentMonthLastDate
  ) {
    return [firstWeek, secondWeek, thirdWeek, fourthWeek];
  }

  if (
    fifthWeekLastDate.month !== month ||
    fifthWeekLastDate.date >= currentMonthLastDate
  ) {
    return [firstWeek, secondWeek, thirdWeek, fourthWeek, fifthWeek];
  }

  return [firstWeek, secondWeek, thirdWeek, fourthWeek, fifthWeek, sixthWeek];
};
