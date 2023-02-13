import {transformDateIntoNumberData} from '../../utils/transformDateIntoNumberData';

export type DateNumberDto = ReturnType<typeof transformDateIntoNumberData>;

export const useGetCalanderWeek = (date: Date): DateNumberDto[][] => {
  const {fullYear, month} = transformDateIntoNumberData(date);

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

  const monthDateObjects: DateNumberDto[] = Array.from(
    {length: 42},
    (_, index) =>
      transformDateIntoNumberData(
        new Date(
          calanderFirstDateObject.getFullYear(),
          calanderFirstDateObject.getMonth(),
          calanderFirstDateObject.getDate() + index,
        ),
      ),
  );

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
