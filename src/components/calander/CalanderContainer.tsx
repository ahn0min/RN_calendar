import {Calander} from './Calander';
import {CalanderHeader} from './CalanderHeader';
import {useHandleCalanderMonth} from '../../hooks/useHandleCalanderMonth';

export const CalanderContainer = () => {
  const {
    selectedDate,
    fullYear,
    monthWithLocale,
    changePrevMonth,
    changeNextMonth,
  } = useHandleCalanderMonth({
    newDate: new Date(),
    location: 'en-US',
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
      <Calander selectedDate={selectedDate} />
    </>
  );
};
