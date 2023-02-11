import {Gesture} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';

// FIXME: JS에서 실행될 수 있는 여러 함수들을 호출해주기만 하는 부분
// 해당 훅은 언제든지 없어질 수 있다.
interface IUserTranslationXParameter {
  callbackOnBegin: () => void;
  callbackOnUpdate: () => void;
  callbackOnEnd: () => void;
}
export const useTranslationX = ({
  callbackOnBegin,
  callbackOnUpdate,
  callbackOnEnd,
}: IUserTranslationXParameter) => {
  const translateXGesture = Gesture.Pan()
    .onBegin(() => runOnJS(callbackOnBegin)())
    .onUpdate(() => {
      runOnJS(callbackOnUpdate);
    })
    .onEnd(() => {
      runOnJS(callbackOnEnd);
    });

  return translateXGesture;
};
