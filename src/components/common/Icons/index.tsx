import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export type GetIconFunction = (color: string) => JSX.Element;

const Icons = {
  Home: (color: string) => (
    <FontAwesomeIcon name="home" size={30} color={color} />
  ),
  Calendar: (color: string) => (
    <FontAwesomeIcon name="calendar" size={30} color={color} />
  ),
  Dumbbell: (color: string) => (
    <FontAwesome5Icon name="dumbbell" size={30} color={color} />
  ),
  User: (color: string) => (
    <FontAwesomeIcon name="user" size={30} color={color} />
  ),
} as {[key: string]: GetIconFunction};

export default Icons;
