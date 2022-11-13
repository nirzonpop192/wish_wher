import React, { useEffect } from 'react';
import mobileAds from 'react-native-google-mobile-ads';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';
import { useSelector } from 'react-redux';
import { User } from '../types';

function App() {
  const auth: User = useSelector((state: any) => state.auth)


  useEffect(() => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        // Initialization complete!
        console.log('adapterStatuses', adapterStatuses)
      });
  }, [])

  return (
    <NavigationContainer>
      {
        !auth
          ?
          <AuthNavigation />
          :
          <MainNavigation />
      }
    </NavigationContainer>
  );
}

export default App;


// Push notifications : $50
