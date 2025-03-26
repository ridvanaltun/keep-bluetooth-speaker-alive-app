import React from 'react';
import {Switch, SwitchProps} from 'react-native';

interface Props extends SwitchProps {}

const SwitchInstance = ({...props}: Props) => {
  return <Switch {...props} />;
};

export type {Props as SwitchProps};
export default SwitchInstance;
