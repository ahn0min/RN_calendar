/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
// import HomePage from '../src/pages/home';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
  // renderer.create(<HomePage />);
});
