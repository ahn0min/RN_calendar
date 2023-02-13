import {useEffect, useState} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const MONTHLY_HEIGHT = 500;
const WEEKLY_HEIGHT = 100;

interface IProps {
  onUpdateCallback: () => {};
  onEndCallback: () => {};
}
export const useGestureTransformCalander = () => {
  const [type, setType] = useState<'montly' | 'weekly'>('montly');
  const [isSliding, setIsSliding] = useState(false);

  const calanderHeight = useSharedValue(
    type === 'montly' ? MONTHLY_HEIGHT : WEEKLY_HEIGHT,
  );
  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(calanderHeight.value, {
      duration: 150,
    }),
  }));

  useEffect(() => {
    if (type === 'montly' && isSliding) {
      setType('weekly');
      setIsSliding(false);
      return;
    }

    if (type === 'weekly' && isSliding) {
      setType('montly');
      setIsSliding(false);
      return;
    }
  }, [isSliding]);

  const gesture = Gesture.Pan()
    .onUpdate(({translationY}) => {
      if (type === 'montly') {
        calanderHeight.value = MONTHLY_HEIGHT + translationY;
        return;
      }
      if (type === 'weekly') {
        calanderHeight.value = WEEKLY_HEIGHT + translationY;
        return;
      }
      console.log(translationY);
      // calanderHeight.value += translationY;
    })
    .onEnd(({translationY}) => {
      if (translationY > 20) {
        calanderHeight.value = MONTHLY_HEIGHT;
        return runOnJS(setIsSliding)(true);
      }
      if (translationY < 20) {
        calanderHeight.value = WEEKLY_HEIGHT;
        return runOnJS(setIsSliding)(true);
      }
    });

  return {
    type,
    setType,
    gesture,
    calanderHeight,
    animatedStyle,
  };
};
