import React, {FunctionComponent} from 'react';
import {Text, SafeAreaView} from 'react-native';

import {viewStyle} from '../styles/view';

const CalenderScreen: FunctionComponent = () => {
  return (
    <SafeAreaView style={viewStyle.centerView}>
      <Text>Calender</Text>
    </SafeAreaView>
  );
};

export default CalenderScreen;
