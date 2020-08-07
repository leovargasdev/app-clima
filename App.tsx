import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';

import Geolocation from '@react-native-community/geolocation';

const App = () => {

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
       console.log({initialPosition});
      },
      error => console.log(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  });
  Geolocation.getCurrentPosition(info => console.log(info));

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>olar</Text>
      </SafeAreaView>
    </>
  );
};

export default App;
