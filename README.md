# Keep Bluetooth Speaker Alive App <!-- omit in toc -->

The app prevents your Bluetooth speaker from going into sleep mode by playing silent audio at regular intervals. Customize the interval (1-10 minutes) and enable/disable auto-start on boot. With a simple interface, this app ensures your speaker stays active for uninterrupted audio during your Android TV sessions.

# Table of Contents <!-- omit in toc -->

- [Note on App Purpose](#note-on-app-purpose)
- [Development Instructions](#development-instructions)
  - [Prerequisites](#prerequisites)
- [Accessing the App on Chromecast Devices](#accessing-the-app-on-chromecast-devices)

## Note on App Purpose

This app was created to address an issue I faced as a Chromecast user with a Samsung soundbar (Samsung HW-C400/TK). When I am on the home page or not watching anything for 4-5 minutes, the soundbar goes into sleep mode, and I have to reconnect it via Bluetooth every time. This app aims to prevent the soundbar from going into sleep mode, solving this recurring inconvenience.

## Development Instructions

### Prerequisites

Before starting development, ensure the following:

- The Android TV and your development PC are connected to the same Wi-Fi network.
- Developer Mode and USB Debugging Mode are enabled on the TV.

### 1. Install Dependencies <!-- omit in toc -->

Run the following command to install the necessary dependencies:

```sh
yarn install
```

### 2. Build the Android App <!-- omit in toc -->

Generate a debug build of the Android app:

```sh
yarn run build:debug
```

### 3. Connect PC to TV via ADB <!-- omit in toc -->

Find the local IP address of your TV and connect ADB:

```sh
adb connect <TV_LOCAL_IP_ADDRESS>
```

Verify the connection:

```sh
adb devices
```

Ensure your TV appears in the list.

### 4. Install the APK on TV <!-- omit in toc -->

Deploy the built APK to the TV:

```sh
yarn run install:apk
```

### 5. Run the App on TV <!-- omit in toc -->

Restart the app on the TV:

```sh
yarn run relaunch:tv
```

### 6. Connect to Metro Bundler <!-- omit in toc -->

Ensure the Metro Bundler server is running and configure the debug server on the TV:

```sh
yarn run android:shake
```

Set the debug server IP address to your PC's local IP with port `8081`.

That's it! You are now ready to start developing the TV app.

## Accessing the App on Chromecast Devices

Please note that Google does not allow third-party apps to appear directly on the home screen of Chromecast devices. To access the app, follow these steps:

1. **Go to Settings**: Navigate to `Configuration` on your Chromecast device.
2. **Access Apps**: Select `Apps` from the menu.
3. **Find the App**: In the `All Apps` section, locate and open the app you installed.
