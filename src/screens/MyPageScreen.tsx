import React, {FunctionComponent} from 'react';
import {Text, SafeAreaView} from 'react-native';

import {viewStyle} from '../styles/view';

const MyPageScreen: FunctionComponent = () => {
  return (
    <SafeAreaView style={viewStyle.centerView}>
      <Text>MyPage</Text>
    </SafeAreaView>
  );
};

export default MyPageScreen;
