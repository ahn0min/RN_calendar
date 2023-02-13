export function transformDateIntoNumberData(targetDate: Date) {
  const fullYear = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const date = targetDate.getDate();
  const day = targetDate.getDay();
  const hours = targetDate.getHours();
  const minutes = targetDate.getMinutes();
  const seconds = targetDate.getSeconds();

  return {
    fullYear,
    month,
    date,
    day,
    hours,
    minutes,
    seconds,
  };
}
