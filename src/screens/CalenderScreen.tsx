import React, {FunctionComponent} from 'react';
import {SafeAreaView} from 'react-native';

import {CalanderContainer} from '../components/calander/CalanderContainer';

const CalenderScreen: FunctionComponent = () => {
  return (
    <SafeAreaView>
      <CalanderContainer />
    </SafeAreaView>
  );
};

export default CalenderScreen;
