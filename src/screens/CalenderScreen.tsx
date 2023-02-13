import React, {FunctionComponent, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import {NewCalanderCarousel} from '../components/calanderCarousel/CalanderMonthCarousel';
import {NewCalanderWeekCarousel} from '../components/calanderCarousel/CalanderWeekCarousel';
import {useGestureTransformCalander} from '../hooks/useGestureTransformCalander';

const CalenderScreen: FunctionComponent = () => {
  const {type, gesture, animatedStyle} = useGestureTransformCalander();
  const [sliding, setSliding] = useState(false);

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <SafeAreaView>
          <Animated.View
            style={animatedStyle}
            onLayout={e => {
              if (!sliding) setSliding(true);
            }}>
            {type === 'montly' ? (
              <NewCalanderCarousel />
            ) : (
              <NewCalanderWeekCarousel />
            )}
          </Animated.View>
        </SafeAreaView>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default CalenderScreen;
