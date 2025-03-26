import AsyncStorage from '@react-native-async-storage/async-storage';

const Keys = {
  AutoStartEnabled: 'AutoStartEnabled',
  Interval: 'Interval',
  ShowNotification: 'ShowNotification',
} as const;

type Keys = (typeof Keys)[keyof typeof Keys];

export const set = async (key: Keys, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('Error saving data', e);
  }
};

export const get = async (key: Keys): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error('Error retrieving data', e);
    return null;
  }
};
