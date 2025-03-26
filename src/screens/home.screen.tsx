import React, {useState} from 'react';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';

import Sound from 'react-native-sound';
import BackgroundTimer from 'react-native-background-timer';

import {StorageUtils} from '../utils';
import {Config} from '../constants';
import {useMountEffect} from '../hooks';

import {Button, Switch, Slider} from '../components';

const keepAliveSound = () => {
  const sound = new Sound('silence.mp3', Sound.MAIN_BUNDLE, error => {
    if (!error) {
      sound.setVolume(0.01);
      sound.play(() => sound.release());
    }
  });
};

const handleBackgroundTimer = (
  start: boolean,
  interval: number,
  notification = false,
) => {
  if (start) {
    BackgroundTimer.runBackgroundTimer(() => {
      keepAliveSound();

      if (notification) {
        ToastAndroid.show('Keep-Alive', ToastAndroid.BOTTOM);
      }
    }, interval * 60 * 1000);
  } else {
    BackgroundTimer.stopBackgroundTimer();

    if (notification) {
      ToastAndroid.show('Keep-Alive Off', ToastAndroid.BOTTOM);
    }
  }
};

const HomeScreen = () => {
  const [enabled, setEnabled] = useState(false);
  const [autoStart, setAutoStart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [interval, setIntervalTime] = useState(Config.defaults.interval);

  useMountEffect(() => {
    const loadPreference = async () => {
      const AutoStartEnabledValue = await StorageUtils.get('AutoStartEnabled');
      const isAutoStartEnabled = AutoStartEnabledValue === 'true';
      setAutoStart(isAutoStartEnabled);
      setEnabled(isAutoStartEnabled);

      const InternalValue = await StorageUtils.get('Interval');
      const newInternalValue = InternalValue
        ? parseInt(InternalValue, 10)
        : Config.defaults.interval;
      setIntervalTime(newInternalValue);

      const ShowNotificationValue = await StorageUtils.get('ShowNotification');
      const isShowNotification = ShowNotificationValue === 'true';
      setShowNotification(isShowNotification);

      if (isAutoStartEnabled) {
        handleBackgroundTimer(true, newInternalValue, isShowNotification);
      }
    };

    loadPreference();
  });

  const toggleKeepAlive = async () => {
    const newValue = !enabled;
    setEnabled(newValue);
    handleBackgroundTimer(newValue, interval, showNotification);
  };

  const toggleAutoStart = async () => {
    const newValue = !autoStart;
    setAutoStart(newValue);
    await StorageUtils.set('AutoStartEnabled', newValue.toString());
  };

  const toggleShowNotification = async () => {
    const newValue = !showNotification;
    setShowNotification(newValue);
    await StorageUtils.set('ShowNotification', newValue.toString());
  };

  const handleIntervalChange = async (newInterval: number) => {
    setIntervalTime(newInterval);
    await StorageUtils.set('Interval', newInterval.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Keep Bluetooth Speaker Alive</Text>

      <View style={styles.switchContainer}>
        <View style={styles.switchItem}>
          <Switch value={enabled} onValueChange={toggleKeepAlive} />
          <Text style={styles.switchText}>Keep Alive</Text>
        </View>

        <View style={styles.switchItem}>
          <Switch
            value={showNotification}
            disabled={enabled}
            onValueChange={toggleShowNotification}
          />
          <Text style={styles.switchText}>Show Notification</Text>
        </View>

        <View style={styles.switchItem}>
          <Switch value={autoStart} onValueChange={toggleAutoStart} />
          <Text style={styles.switchText}>Auto-Start on Boot</Text>
        </View>
      </View>

      <View style={styles.intervalContainer}>
        <Text style={styles.intervalText}>Interval: {interval} min</Text>
        <Slider
          style={styles.slider}
          disabled={enabled}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={interval}
          onValueChange={handleIntervalChange}
        />
      </View>

      <View style={styles.buttons}>
        <Button
          onPress={keepAliveSound}
          style={styles.button}
          title="Test Sound"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  switchContainer: {
    gap: 10,
  },
  switchItem: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 200,
  },
  switchText: {
    color: 'white',
    marginLeft: 10,
  },
  intervalContainer: {
    marginTop: 20,
  },
  intervalText: {
    color: 'white',
  },
  slider: {
    width: 200,
    height: 40,
  },
  buttons: {
    gap: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default HomeScreen;
