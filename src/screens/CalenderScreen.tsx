import React, {FunctionComponent} from 'react';
import {SafeAreaView} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {CalanderContainer} from '../components/calander/CalanderContainer';

const CalenderScreen: FunctionComponent = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <CalanderContainer />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default CalenderScreen;
