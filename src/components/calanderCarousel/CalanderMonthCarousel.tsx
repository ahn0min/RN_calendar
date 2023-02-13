import {useEffect, useRef} from 'react';
import {useWindowDimensions} from 'react-native';
import Animated from 'react-native-reanimated';

import {useAnimatedFlatListScrollToIndex} from '../../hooks/new/useAnimatedFlatListScrollToIndex';
import {useMonthCarouselCalanders} from '../../hooks/new/useMonthCarouselCalanders';
import {CalanderHeader} from './CalanderHeader';
import {CalanderMonth} from './CalanderMonth';

export const NewCalanderCarousel = () => {
  const {
    currentDate,
    selectedDate,
    fullYear,
    carouselMonths,
    carouselMonthsFirstDates,
    changeSelectedDate,
    changeCurrentDateIntoPrevDate,
    changeCurrentDateIntoNextDate,
    handleCurrentDateOnNativeScroll,
  } = useMonthCarouselCalanders();

  const localCurrentMonth = currentDate.toLocaleDateString(undefined, {
    month: 'short',
  });
  const {animatedFlatListRef, handleScrollToIndex} =
    useAnimatedFlatListScrollToIndex();
  const {width} = useWindowDimensions();

  useEffect(() => {
    handleScrollToIndex({index: 1, animated: false});
  }, [currentDate]);

  return (
    <>
      <CalanderHeader
        fullYear={fullYear}
        monthWithLocale={localCurrentMonth}
        changePrevMonth={changeCurrentDateIntoPrevDate}
        changeNextMonth={changeCurrentDateIntoNextDate}
      />
      <Animated.FlatList
        ref={animatedFlatListRef as any}
        horizontal
        pagingEnabled
        initialScrollIndex={Math.floor(carouselMonths.length / 2)}
        onMomentumScrollEnd={handleCurrentDateOnNativeScroll}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        data={carouselMonths}
        renderItem={({item: monthDate, index}) => {
          return (
            <CalanderMonth
              monthDate={monthDate}
              viewDate={carouselMonthsFirstDates[index]}
              selectedDate={{
                fullYear: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                date: selectedDate.getDate(),
              }}
              changeSelectedDateOrViewDate={changeSelectedDate}
            />
          );
        }}
      />
    </>
  );
};
