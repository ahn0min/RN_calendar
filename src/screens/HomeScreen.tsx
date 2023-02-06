import React, {FunctionComponent} from 'react';
import {Text, SafeAreaView} from 'react-native';

import {viewStyle} from '../styles/view';

const HomeScreen: FunctionComponent = () => {
  return (
    <SafeAreaView style={viewStyle.centerView}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
