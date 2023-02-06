import React, {FunctionComponent} from 'react';
import {Text, SafeAreaView} from 'react-native';

import {viewStyle} from '../styles/view';

const LibraryScreen: FunctionComponent = () => {
  return (
    <SafeAreaView style={viewStyle.centerView}>
      <Text>Library</Text>
    </SafeAreaView>
  );
};

export default LibraryScreen;
