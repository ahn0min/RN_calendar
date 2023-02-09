import {Calander} from './Calander';
import {CalanderHeader} from './CalanderHeader';
import {useHandleCalanderMonth} from '../../hooks/useHandleCalanderMonth';

export const CalanderContainer = () => {
  const {
    viewDate,
    selectedDate,
    fullYear,
    monthWithLocale,
    changePrevMonth,
    changeNextMonth,
    changeSelectedDateOrViewDate,
  } = useHandleCalanderMonth({
    currentDate: new Date(),
    location: 'ko-KR',
    toLocaleDateStringOptions: {
      month: 'long',
    },
  });

  return (
    <>
      <CalanderHeader
        fullYear={fullYear}
        monthWithLocale={monthWithLocale}
        changePrevMonth={changePrevMonth}
        changeNextMonth={changeNextMonth}
      />
      <Calander
        viewDate={viewDate}
        selectedDate={selectedDate}
        changeSelectedDateOrViewDate={changeSelectedDateOrViewDate}
      />
    </>
  );
};
