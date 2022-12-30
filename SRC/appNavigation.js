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

const AppNavigator = () => {
  // const isLogin = false;
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);

  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
 
  console.log(
    '🚀 ~ file: appNavigation.js ~ line 32 ~ AppNavigator ~ walkThrough',
    token != null && isGoalCreated == true,
    isGoalCreated,
  );

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const firstScreen =
        !token ?
        'LoginScreen'
        :
        'HomeScreen'
        ;

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
