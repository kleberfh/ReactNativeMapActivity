import React from 'react';
import Map from "./src/Pages/Map";
import { LogBox } from 'react-native';
import { NativeBaseProvider } from 'native-base';

LogBox.ignoreLogs(['NativeBase: The contrast ratio of 1:1 for darkText on transparent']);

export default function App() {
  return (
    <NativeBaseProvider>
      <Map />
    </NativeBaseProvider>
  );
}
