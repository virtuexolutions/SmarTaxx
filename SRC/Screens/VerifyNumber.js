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

import {useDispatch, useSelector} from 'react-redux';

import navigationService from '../navigationService';

import Color from '../Assets/Utilities/Color';
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
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useEffect} from 'react';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const VerifyNumber = props => {
  const dispatch = useDispatch();
  const {fcmToken} = useSelector(state => state.commonReducer);

  //params
  const fromForgot = props?.route?.params?.fromForgot;
  const phoneNumber = props?.route?.params?.phoneNumber;

    // console.log(phoneNumber)

  //states
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
  const [abcd, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });
  const [time, settime] = useState(120);
  const [timerLabel, settimerLabel] = useState('Resend In ');
  if (time > 0) {
    setTimeout(function () {
      settime(time - 1);
    }, 1000);
  }

  const label = () => {
    time == 0 && (settimerLabel('Resend Code '), settime(''));
  };

  const sendOTP = async()=>{
    const url = "password/email"
    setIsLoading(true);
    const response = await Post(url ,{email : 'syedbaber115@gmail.com'} , apiHeader());
    setIsLoading(false);
    if(response != undefined){
      Platform.OS == 'android' ?
      ToastAndroid.show(`OTP sent to syedbaber115@gmail.com` , ToastAndroid.SHORT) :
      alert(`OTP sent to syedbaber115@gmail.com`)
    }
  }

  const VerifyOTP = async()=>{
    const url = "verify";
    setIsLoading(true);
    console.log(code);
    const response = await Post(url ,{email_code : code} , apiHeader());
    setIsLoading(false);
    if(response != undefined){
      Platform.OS == 'android' ?
      ToastAndroid.show(`otp verified` , ToastAndroid.SHORT) :
      alert(`otp verified`)

      navigationService.navigate('ResetPassword',{phoneNumber : phoneNumber})
    }
    
  }

  useEffect(() => {
    label();
  }, [time]);
  
  // useEffect(()=>{
  //   if(timerLabel == )
  //   sendOTP();
  // },[timerLabel])

  return (
    <ScreenBoiler
      statusBarBackgroundColor={Color.green}
      statusBarContentStyle={'light-content'}
    >
      <View style={styles.sectionContainer}>
        <Image
          source={require('../Assets/Images/verify.png')}
          //   resizeMode={'contain'}
          style={{
            alignSelf: 'center',
            // backgroundColor : 'red',
            height: windowHeight * 0.35,
            marginTop: moderateScale(10, 0.3),
          }}
        />
        <View style={styles.subcontainer}>
          <CustomText style={styles.txt2}>Verify Account</CustomText>
          <CustomText style={styles.txt3}>
            Enter four digit code we have sent to{' '}
            {<CustomText style={{color: Color.black}}>{phoneNumber}</CustomText>}
          </CustomText>
          <CodeField
            placeholder={'0'}
            ref={ref}
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}
              >
                <CustomText
                  style={[styles.cellText, isFocused && {color: Color.black}]}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </CustomText>
              </View>
            )}
          />
          <CustomText style={styles.txt3}>
            Haven't Recieved Verification Code ?{' '}
            {
              <TouchableOpacity
                disabled={timerLabel == 'Resend Code ' ? false : true}
                onPress={() => {
                  sendOTP(),
                  settimerLabel('ReSend in '), settime(120);
                }}
              >
                <CustomText style={[styles.txt4]}>
                  {timerLabel} {time}
                </CustomText>
              </TouchableOpacity>
            }
          </CustomText>
          <CustomButton
            // textTransform={"capitalize"}
            text={
              isLoading ? (
                <ActivityIndicator color={'#000'} size={'small'} />
              ) : (
                'Verify now'
              )
            }
            isBold
            textColor={Color.white}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            marginTop={moderateScale(40, 0.3)}
            onPress={VerifyOTP}
            bgColor={Color.green}
            borderColor={Color.white}
            borderWidth={2}
            borderRadius={moderateScale(30, 0.3)}
          />
        </View>
      </View>
    </ScreenBoiler>
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
    color: Color.green,
    fontSize: moderateScale(25, 0.6),
    fontWeight: 'bold',
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(13, 0.6),
    textAlign: 'center',
    width: '60%',
    marginTop: moderateScale(20, 0.3),
    lineHeight: moderateScale(20, 0.3),
  },
  txt4: {
    color: Color.green,
    fontSize: moderateScale(14, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.white,
  },
  txt5: {
    color: Color.black,

    fontSize: moderateScale(12, 0.6),
  },

  subcontainer: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    height: windowHeight * 0.6,
    backgroundColor: Color.white,
    alignItems: 'center',
    paddingTop: moderateScale(40, 0.3),
    borderTopLeftRadius: moderateScale(45, 0.3),
    borderTopRightRadius: moderateScale(45, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  codeFieldRoot: {
    marginTop: moderateScale(20, 0.3),
    marginBottom: moderateScale(15, 0.3),
    width: windowWidth * 0.7,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: moderateScale(50, 0.3),
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    // backgroundColor: Color.black,
    // borderRadius: moderateScale(10, 0.3),
  },
  focusCell: {
    // backgroundColor: Color.themeColor,
    // borderRadius: moderateScale(10, 0.3),

    borderBottomColor: Color.themeDarkGray,
    borderBottomWidth: 2,
  },
  cellText: {
    color: Color.green,
    fontSize: moderateScale(36, 0.3),
    textAlign: 'center',
  },
});

export default VerifyNumber;
