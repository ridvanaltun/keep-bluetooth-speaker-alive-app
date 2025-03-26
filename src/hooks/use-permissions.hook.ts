import {useCallback} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

const usePermissions = () => {
  const requestBluetooth = useCallback(() => {
    return new Promise<boolean>((resolve, reject) => {
      if (Platform.OS === 'android' && Platform.Version >= 31) {
        PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]).then(result => {
          if (result) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } else if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        )
          .then(requestResult => {
            if (requestResult === 'granted') {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(error => {
            reject(error);
          });
      } else {
        resolve(true);
      }
    });
  }, []);

  const requestNotification = useCallback(() => {
    return new Promise<boolean>((resolve, reject) => {
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        )
          .then(result => {
            if (result === 'granted') {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(error => {
            reject(error);
          });
      } else {
        resolve(true);
      }
    });
  }, []);

  return {
    requestBluetooth,
    requestNotification,
  };
};

export default usePermissions;
