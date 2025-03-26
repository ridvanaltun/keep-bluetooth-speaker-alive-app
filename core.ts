import {LogBox} from 'react-native';

/**
 * Logs
 */
const NEW_NATIVE_EVENT_EMITTER = 'new NativeEventEmitter';

const logs = [NEW_NATIVE_EVENT_EMITTER];

const warn = console.warn;
const err = console.error;

console.warn = (...arg) => {
  for (const log of logs) {
    if (arg[0].includes(log)) {
      return;
    }
  }
  warn(...arg);
};

console.error = (...arg) => {
  for (const log of logs) {
    if (arg[0]?.includes?.(log)) {
      return;
    }
  }
  err(...arg);
};

LogBox.ignoreLogs(logs);

export {};
