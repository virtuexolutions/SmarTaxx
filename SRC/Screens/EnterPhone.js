import React, {useState} from 'react';
import {
  Image,
  Dimensions,
  ImageBackground,
  Platform,
  ToastAndroid,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import navigationService from '../navigationService';

import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import CardContainer from '../Components/CardContainer';
import CustomHeader from '../Components/CustomHeader';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const EnterPhone = props => {
  const fromForgot = props?.route?.params?.fromForgot;
  console.log('here=>', fromForgot);
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendOTP = async () => {
    const url = 'password/email';
    if (['', null, undefined].includes(phone)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Phone number is required', ToastAndroid.SHORT)
        : alert('Phone number is required');
    }
    setIsLoading(true);
    const response = await Post(url, {email: phone}, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      console.log('response data =>', response?.data);
      Platform.OS == 'android'
        ? ToastAndroid.show(`OTP sent to ${phone}`, ToastAndroid.SHORT)
        : alert(`OTP sent to ${phone}`);
      fromForgot
        ? navigationService.navigate('VerifyNumber', {
            fromForgot: fromForgot,
            phoneNumber: `${phone}`,
          })
        : navigationService.navigate('VerifyNumber', {
            phoneNumber: `${phone}`,
          });
    }
  };

  return (
    <>
      <CustomStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ImageBackground
        style={{
          flex: 1,
          width: windowWidth,
          height: windowHeight,
        }}
        resizeMode={'stretch'}
        source={require('../Assets/Images/imageBackground.png')}>
        <CustomHeader
          style={{
            marginTop: moderateScale(20, 0.3),
          }}
          text={'Enter Your Email'}
          leftIcon
        />

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: moderateScale(20, 0.3),
            alignItems: 'center',
            // justifyContent : 'center',
            width: '100%',
            // height : windowHeight * 0.8,
            // paddingTop: moderateScale(50, 0.3),
            // backgroundColor  : 'red'
          }}>
          <Image
            source={require('../Assets/Images/email.png')}
            resizeMode={'contain'}
            style={{
              alignSelf: 'center',
              // backgroundColor : 'red',
              height: windowHeight * 0.3,
              marginTop: moderateScale(30, 0.3),
              marginBottom: moderateScale(30, 0.3),
            }}
          />

          <CardContainer style={{paddingVertical: moderateScale(30, 0.3)}}>
            <CustomText style={styles.txt2}>Your Email</CustomText>
            <CustomText style={styles.txt3}>
              Enter Your Email to Reset password
            </CustomText>
            {/* <View style={styles.phoneView}> */}
            <TextInputWithTitle
              iconName="envelope"
              iconType={FontAwesome}
              titleText={'Email'}
              secureText={false}
              placeholder={'Email'}
              setText={setPhone}
              value={phone}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.7}
              border={1}
              borderColor={'#1B5CFB45'}
              backgroundColor={'#FFFFFF'}
              // marginTop={moderateScale(30, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              // rightIcon
              elevation
            />
            {/* </View> */}
          </CardContainer>
          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#ffffff'} size={'small'} />
              ) : (
                'Send'
              )
            }
            isBold
            textColor={Color.white}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            marginTop={moderateScale(15, 0.3)}
            onPress={sendOTP}
            bgColor={Color.themeColor}
            borderColor={Color.white}
            // borderWidth={2}
            borderRadius={moderateScale(30, 0.3)}
          />
        </KeyboardAwareScrollView>
      </ImageBackground>
    </>
  );
};

const styles = ScaledSheet.create({

  txt2: {
    color: Color.black,
    fontSize: moderateScale(20, 0.6),
    fontWeight: 'bold',
  },
  txt3: {
    color: Color.themePink,
    fontSize: moderateScale(12, 0.6),
    textAlign: 'center',
    width: '60%',
    marginTop: moderateScale(5, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },
 
 
  phoneView: {
    width: '80%',
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    marginTop: moderateScale(20, 0.3),
  },

});

export default EnterPhone;
