import React from 'react';
import Slider, {SliderProps} from '@react-native-community/slider';

interface Props extends SliderProps {}

const SliderInstance = ({...props}: Props) => {
  return <Slider {...props} />;
};

export type {Props as SliderProps};
export default SliderInstance;
