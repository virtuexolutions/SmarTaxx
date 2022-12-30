import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  ImageBackground,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import navigationService from '../navigationService';

import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomAlertModal from '../Components/CustomAlertModal';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomButton from '../Components/CustomButton';
import {setIsVerified, setUserToken} from '../Store/slices/auth';
import {validateEmail} from '../Config';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {setUserData} from '../Store/slices/common';
import {Icon, ScrollView} from 'native-base';
import CustomImage from '../Components/CustomImage';
import CardContainer from '../Components/CardContainer';
import CountryPicker, {DARK_THEME} from 'react-native-country-picker-modal';
import CustomHeader from '../Components/CustomHeader';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const EnterPhone = props => {
  const dispatch = useDispatch();
  const {fcmToken} = useSelector(state => state.commonReducer);

  const fromForgot = props?.route?.params?.fromForgot;
  console.log('here=>', fromForgot);
  const [phone, setPhone] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [showNumberModal, setShowNumberModal] = useState(false);
  const [countryCodePrefex, setCountryCodePrefex] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [country, setCountry] = useState('');
  console.log(countryCode);

  const sendOTP = async () => {
    const url = 'password/email';
    if (
      ['', null, undefined].includes(phone) ||
      ['', null, undefined].includes(countryCode)
    ) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Phone number is required', ToastAndroid.SHORT)
        : alert('Phone number is required');
    }
    setIsLoading(true);
    const response = await Post(
      url,
      {email: 'syedbaber115@gmail.com'},
      apiHeader(),
    );
    setIsLoading(false);
    if (response != undefined) {
      console.log('response data =>', response?.data);
      Platform.OS == 'android'
        ? ToastAndroid.show(
            `OTP sent to syedbaber115@gmail.com`,
            ToastAndroid.SHORT,
          )
        : alert(`OTP sent to syedbaber115@gmail.com`);
      fromForgot
        ? navigationService.navigate('VerifyNumber', {
            fromForgot: fromForgot,
            phoneNumber: `${countryCode}${phone}`,
          })
        : navigationService.navigate('VerifyNumber', {
            phoneNumber: `${countryCode}${phone}`,
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
          <CustomHeader style={{
            marginTop : moderateScale(20,0.3)
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
            onPress={()=>{
              navigationService.navigate('VerifyNumber',{phoneNumber : phone})
            }}
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
  sectionContainer: {
    // flex: 1,
    height: windowHeight,
    paddingTop: moderateScale(5, 0.3),
  },
  Txt: {
    marginTop: moderateScale(10, 0.3),
    color: Color.themeBlack,
    fontSize: moderateScale(22, 0.6),
    textAlign: 'center',
  },
  tou: {
    marginTop: height * 0.03,
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: windowWidth * 0.75,
    // backgroundColor : 'red',
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15, 0.3),
    marginTop: moderateScale(10, 0.3),
  },
  cont: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.3,
    borderRadius: moderateScale(20, 0.3),
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: Color.white,
    borderRadius: moderateScale(30, 0.3),
    paddingHorizontal: moderateScale(25, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    marginVertical: moderateScale(40, 0.3),
  },
  img: {height: windowHeight * 0.26},
  Tou: {
    width: width * 0.9,
    height: height * 0.055,
    marginTop: height * 0.03,
  },
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
  txt4: {
    color: Color.lightGreen,
    fontSize: moderateScale(14, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.white,
  },
  txt5: {
    color: Color.black,

    fontSize: moderateScale(12, 0.6),
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9,
    // marginTop: moderateScale(10,0.3),
  },
  phoneView: {
    width: '80%',
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    // justifyContent: 'space-around',
    marginTop: moderateScale(20, 0.3),
  },
  countryCode: {
    borderRadius: moderateScale(17, 0.3),
    color: Color.themeLightGray,
    height: height * 0.047,
    paddingHorizontal: moderateScale(10, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10, 0.3),
    backgroundColor: '#EAEAEA',
  },
});

export default EnterPhone;
