import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

const ButtonInstance = ({
  title,
  style,
  disabled,
  loading,
  onPress,
  ...props
}: Props) => {
  const _disabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        _disabled ? styles.containerDisabled : styles.containerEnabled,
        style,
      ]}
      disabled={_disabled}
      onPress={onPress}
      {...props}>
      {loading ? (
        <ActivityIndicator color="white" size={25} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 5,
    paddingHorizontal: 20,
    justifyContent: 'center',
    height: 50,
  },
  containerEnabled: {
    backgroundColor: '#2196F3',
  },
  containerDisabled: {
    backgroundColor: 'gray',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 8,
  },
});

export type {Props as ButtonProps};
export default ButtonInstance;
