import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationService from './navigationService';
import {useSelector} from 'react-redux';
import LoginScreen from './Screens/LoginScreen';
import Receptionist from './Screens/Receptionist';
import Thankyou from './Screens/Thankyou';
import InternalAuditor from './Screens/InternalAuditor';
import Options from './Screens/Options';
import InnerScreen from './Screens/InnerScreen';
import Signup from './Screens/Signup';
import EnterPhone from './Screens/EnterPhone';
import VerifyNumber from './Screens/VerifyNumber';
import ResetPassword from './Screens/ResetPassword';

const AppNavigator = () => {
  // const isLogin = false;
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const token = useSelector(state => state.authReducer.token);
  const user = useSelector(state => state.commonReducer.userData);
  console.log(
    '🚀 ~ file: appNavigation.js:22 ~ AppNavigator ~ user',
    user?.role,
  );

  

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const firstScreen = !token
      ? 'LoginScreen'
      : token && user?.role == 'Receptionist'
      ? 'Receptionist'
      : token && user?.role == 'Internal Auditor'
      ? 'InternalAuditor'
      : 'LoginScreen';

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}>
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="Receptionist" component={Receptionist} />
          <RootNav.Screen name="Thankyou" component={Thankyou} />
          <RootNav.Screen name="InternalAuditor" component={InternalAuditor} />
          <RootNav.Screen name="Options" component={Options} />
          <RootNav.Screen name="InnerScreen" component={InnerScreen} />
          <RootNav.Screen name="Signup" component={Signup} />
          <RootNav.Screen name="EnterPhone" component={EnterPhone} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

// export const TabNavigation = () => {
//   const Tabs = createBottomTabNavigator();
//   return (
//     <Tabs.Navigator
//       screenOptions={({route}) => ({
//         headerShown: false,
//         tabBarIcon: ({focused}) => {
//           let iconName;
//           let color = Color.themeColor;
//           let size = moderateScale(20, 0.3);

//           if (route.name === 'HomeScreen') {
//             iconName = focused ? 'home' : 'home-outline';
//             color = focused ? Color.green : Color.themeLightGray;
//             size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           } else if (route.name === 'Guide') {
//             iconName = focused ? 'stats-chart' : 'stats-chart-outline';
//             color = focused ? Color.green : Color.themeLightGray;
//             size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           } else if (route.name === 'Wallet') {
//             iconName = focused ? 'ios-wallet' : 'ios-wallet-outline';
//             color = focused ? Color.green : Color.themeLightGray;
//             size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           } else {
//             iconName = focused ? 'people-circle' : 'people-circle-outline';
//             color = focused ? Color.green : Color.themeLightGray;
//             size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
//           }
//           return (
//             <Icon name={iconName} as={Ionicons} color={color} size={size} />
//           );
//         },
//         tabBarShowLabel: false,
//       })}>
//       <Tabs.Screen name={'HomeScreen'} component={HomeScreen} />
//       <Tabs.Screen name={'Guide'} component={Guide} />
//       <Tabs.Screen name={'Wallet'} component={Wallet} />
//       <Tabs.Screen name={'Profile'} component={Profile} />
//     </Tabs.Navigator>
//   );
// };

export default AppNavigator;
