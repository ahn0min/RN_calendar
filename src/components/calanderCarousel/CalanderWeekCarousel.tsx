import {useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import Animated from 'react-native-reanimated';

import {useAnimatedFlatListScrollToIndex} from '../../hooks/new/useAnimatedFlatListScrollToIndex';
import {useWeeklyCarouselCalander} from '../../hooks/useWeeklyCarouselCalander';
import {CalanderHeader} from './CalanderHeader';
import {CalanderWeek} from './CalanderWeek';

export const NewCalanderWeekCarousel = () => {
  const {
    currentDate,
    selectedDate,
    carouselWeeks,
    changeSelectedDate,
    changeCurrentDateIntoPrevDate,
    changeCurrentDateIntoNextDate,
    handleCurrentDateOnNativeScroll,
  } = useWeeklyCarouselCalander({
    prevSelectedDate: undefined,
  });

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
        fullYear={currentDate.getFullYear()}
        monthWithLocale={localCurrentMonth}
        changePrevMonth={changeCurrentDateIntoPrevDate}
        changeNextMonth={changeCurrentDateIntoNextDate}
      />
      <Animated.FlatList
        ref={animatedFlatListRef as any}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={Math.floor(carouselWeeks.length / 2)}
        onMomentumScrollEnd={handleCurrentDateOnNativeScroll}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        data={carouselWeeks}
        extraData={selectedDate}
        renderItem={({item: weekDate}) => {
          return (
            <CalanderWeek
              weekDate={weekDate}
              viewDate={selectedDate}
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
