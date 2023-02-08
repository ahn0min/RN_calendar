import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export type GetIconFunction = (color: string) => JSX.Element;
export type IconFunctionProps = {size: number; color: string};

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
  ChevronLeft: ({size, color}: IconFunctionProps) => (
    <FontAwesomeIcon name="chevron-left" size={size} color={color} />
  ),
  ChevronRight: ({size, color}: IconFunctionProps) => (
    <FontAwesomeIcon name="chevron-right" size={size} color={color} />
  ),
} as const;

export default Icons;
