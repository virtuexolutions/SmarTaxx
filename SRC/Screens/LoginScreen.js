import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomModal from '../Components/CustomModal';
import LinearGradient from 'react-native-linear-gradient';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../Components/CustomButton';
import {ScrollView} from 'native-base';
import navigationService from '../navigationService';
import {useIsFocused} from '@react-navigation/native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {validateEmail} from '../Config';
import {setUserData} from '../Store/slices/common';
import {setUserLogin} from '../Store/slices/auth';
import {useDispatch} from 'react-redux';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(true);
  const [firstSection, setFirstSection] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Splash1 = require('../Assets/Images/AccesoriesBig.png');
  const Splash2 = require('../Assets/Images/AccesoriesRight.png');
  const Splash3 = require('../Assets/Images/AccesoriesSmall.png');

  const handleLogin = async loginFor => {
    console.log(
      '🚀 ~ file: LoginScreen.js:38 ~ handleLogin ~ loginFor',
      loginFor,
    );
    const url = 'login';
    const body = {
      email: email.trim(),
      password: password,
    };
    if (email == '' || password == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Required Field is empty', ToastAndroid.SHORT)
        : alert('Required Field is empty');
    }
    if (!validateEmail(email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Please use valid email', ToastAndroid.SHORT)
        : alert('Please use valid email');
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      console.log(response?.data);
      // console.log('yes' ,  response?.data?.data?.user_info?.role , loginFor)
      response?.data?.data?.user_info?.role == loginFor
        ? (dispatch(setUserData(response?.data?.data?.user_info)),
          dispatch(setUserLogin(response?.data?.data?.token)))
        : Platform.OS == 'android'
        ? ToastAndroid.show(
            'This User is not registered for selected role',
            ToastAndroid.SHORT,
          )
        : alert('This User is not registered for selected role');
    }
  };

  useEffect(() => {
    setVisible(true);

    return () => {
      setVisible(false);
    };
  }, [isFocused]);

  return (
    <ScreenBoiler
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={'dark-content'}>
      <View style={styles.container}>
        <View style={[styles?.textContainer]}>
          <CustomImage
            source={Splash1}
            resizeMode={'contain'}
            style={[styles.bottomImage]}
          />
        </View>
        <View style={[styles?.textContainer1]}>
          <CustomImage
            source={Splash2}
            resizeMode={'contain'}
            style={[styles.bottomImage1]}
          />
        </View>
        <View style={[styles?.textContainer2]}>
          <CustomImage
            source={Splash3}
            resizeMode={'contain'}
            style={[styles.bottomImage2]}
          />
        </View>
      </View>
      <CustomModal>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignSelf: 'center',
            alignItems: 'center',
          }}
          style={{
            width: '100%',
            flexGrow: 0,
            // minHeight : windowHeight * 0.6,
            // backgroundColor : 'red',
          }}>
          <Text style={styles.Heading}>FINANCE</Text>
          <Text style={styles.subHeading}>Welcome Back</Text>
          <Text style={styles.text}>
            Please use your username and password For Login
          </Text>
          <TextInputWithTitle
            iconName="user-o"
            iconType={FontAwesome}
            titleText={'Email'}
            secureText={false}
            placeholder={'Email'}
            setText={setEmail}
            value={email}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.7}
            border={1}
            borderColor={'#1B5CFB45'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(30, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
            rightIcon
            elevation
          />
          <TextInputWithTitle
            // iconName="lock"
            // iconType={FontAwesome}
            titleText={'password'}
            secureText={true}
            placeholder={'password'}
            setText={setPassword}
            value={password}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.7}
            border={1}
            borderColor={'#1B5CFB45'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
            marginBottom={moderateScale(10, 0.3)}
            elevation
          />
          <CustomText
            onPress={() => {
              navigationService.navigate('EnterPhone', {fromForgot: true});
            }}
            style={styles.txt3}>
            {'Forgot Password?'}
          </CustomText>

          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Login With receptionist'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.68}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              handleLogin('Receptionist');
            }}
            bgColor={Color.themeColor}
            // borderColor={Color.white}
            // borderWidth={2}
            borderRadius={moderateScale(30, 0.3)}
          />
          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Login With Internal Auditor'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.68}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              handleLogin('Internal Auditor');
            }}
            bgColor={Color.themeColor}
            borderRadius={moderateScale(30, 0.3)}
          />
          <View style={styles.container2}>
            <CustomText style={styles.txt5}>
              {"Don't have an account? "}
            </CustomText>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{marginLeft: windowWidth * 0.01}}
              onPress={() => navigationService.navigate('Signup')}>
              <CustomText style={styles.txt4}>{'Sign Up'}</CustomText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </CustomModal>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    height: windowHeight,
    width: windowWidth,
    backgroundColor: Color.white,
  },
  bottomImage: {
    width: windowWidth * 0.5,
  },
  subHeading: {
    fontSize: moderateScale(23, 0.3),
    color: '#000000',
    alignSelf: 'center',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: moderateScale(10, 0.3),
  },
  bottomImage1: {
    width: windowWidth * 0.25,
  },
  bottomImage2: {
    width: windowWidth * 0.19,
  },

  textContainer: {
    marginTop: moderateScale(20, 0.3),
  },
  textContainer2: {
    height: windowHeight * 0.3,
    marginTop: moderateScale(50, 0.3),
    justifyContent: 'center',
    // backgroundColor : 'red'
  },
  textContainer1: {
    marginTop: moderateScale(-70, 0.3),
    alignSelf: 'flex-end',
    // backgroundColor : 'green'
  },
  Heading: {
    fontSize: moderateScale(36, 0.3),
    fontWeight: 'bold',
    color: '#1B5CFB',
    textAlign: 'center',
    // fontFamily : 'serif',
  },
  text: {
    fontSize: moderateScale(12, 0.3),
    color: '#000000',
    textAlign: 'center',
    lineHeight: moderateScale(20, 0.3),
    // marginTop: moderateScale(10, 0.3),
    width: '60%',
    alignSelf: 'center',
  },
  emptyBar: {
    width: windowWidth * 0.6,
    marginTop: moderateScale(20, 0.3),
    height: windowHeight * 0.014,
    borderRadius: moderateScale(10, 0.3),
    backgroundColor: '#999999',
    marginBottom: moderateScale(10, 0.3),
    overflow: 'hidden',
  },
  txt3: {
    color: Color.themePink,
    fontSize: moderateScale(10, 0.6),
    alignSelf: 'flex-end',
    marginRight: moderateScale(40, 0.3),
    fontWeight: '600',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
    // marginTop: moderateScale(10,0.3),
  },
  txt4: {
    color: Color.themePink,
    fontSize: moderateScale(14, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.white,
  },
  txt5: {
    color: Color.themeLightGray,

    fontSize: moderateScale(12, 0.6),
  },
});

export default LoginScreen;
