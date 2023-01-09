import React, {useEffect, useState} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {NativeBaseProvider} from 'native-base';

import {store, persistor} from './SRC/Store/index';
import {
  requestCameraPermission,
  requestLocationPermission,
  requestWritePermission,
} from './SRC/Utillity/utils';
import SplashScreen from './SRC/Screens/SplashScreen';
import AppNavigator from './SRC/appNavigation';
import LoginScreen from './SRC/Screens/LoginScreen';
import Signup from './SRC/Screens/Receptionist';
import Receptionist from './SRC/Screens/Receptionist';
import { Platform } from 'react-native';



const App = () => {


  return (
   <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <NativeBaseProvider>
      <MainContainer/>
    </NativeBaseProvider>

    </PersistGate>

   </Provider>
  );
};

const MainContainer =()=>{

  const dispatch = useDispatch();

  useEffect(() => {
    async function GetPermission() {
      await requestCameraPermission();
      await requestWritePermission();
      await requestLocationPermission();
    }
     // console.log('hererererer');
    //  messaging()
    //    .getToken()
    //    .then((_token) => {
    //      dispatch(SetFCMToken(_token));
    //    })
    //    .catch(() => console.log("token error"));
   Platform.OS == 'android' && GetPermission();
  }, []);

  const [isloading] = useloader(true);
  if (isloading == true) {
    return <SplashScreen />;
  }
  return <AppNavigator />;

}


const useloader = value => {
  const [isloading, setIsloading] = useState(value);
  const [loadingTime] = useState(15000);
  useEffect(() => {
    setTimeout(() => setIsloading(false), loadingTime);
  }, []);
  return [isloading];
};


export default App;
