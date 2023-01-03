import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CardContainer from '../Components/CardContainer';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import navigationService from '../navigationService';
import ImagePickerModal from '../Components/ImagePickerModal';
import CustomImage from '../Components/CustomImage';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomText from '../Components/CustomText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validateEmail} from '../Config';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../Store/slices/common';
import {setUserLogin, setUserToken} from '../Store/slices/auth';
import Bottomtab from '../Components/Bottomtab';

const MyAccounts = props => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);

  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [designation, setDesignation] = useState(user?.designation);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({});
  console.log("🚀 ~ file: MyAccounts.js:48 ~ MyAccounts ~ image", image?.uri)
  const [profileImage , setProfileImage] = useState(user?.image)
  // console.log("🚀 ~ file: MyAccounts.js:49 ~ MyAccounts ~ profileImage", profileImage)
  const [contact, setContact] = useState(user?.phone);
  const [email, setEmail] = useState(user?.email);
  const [showModal, setShowModal] = useState(false);
  const [userRole, setUserRole] = useState(user?.role);

  // const imageArray = Object.keys(imageObject).length > 0 ?
  // [{
  //   uri : imageObject.uri
  // }]
  // :
  // [{
  //   uri : `${user?.photo}`
  // }]

  const EditProfile = async () => {
    const params = {
      first_name: firstName,
      last_name: lastName,
      designation : designation ,
      
    };
    const formdata = new FormData();
    for (let key in params) {
      if ([undefined, '', null].includes(params[key])) {
        return Platform.OS == 'android'
          ? ToastAndroid.show(
              `${key.replace(formRegEx, formRegExReplacer)} is empty`,
              ToastAndroid.SHORT,
            )
          : Alert.alert(
              `${key.replace(formRegEx, formRegExReplacer)} is empty`,
            );
      }
      formdata.append(key, params[key]);
    }
    if (Object.keys(image).length > 0) {
      formdata.append('image', image);
    }
    console.log(formdata);

    const url = 'profile-update';
    setIsLoading(true);
    const response = await Post(url, formdata, apiHeader(token, true));
    setIsLoading(false);

    if (response !== undefined) {
      console.log('response?.data?.data?.user', response?.data);
      dispatch(setUserData(response?.data?.user_info));

      Platform.OS == 'android'
        ? ToastAndroid.show('Profile Updated Succesfully', ToastAndroid.SHORT)
        : Alert.alert('Profile Updated Succesfully');
    }
  };
  const passwordReset = async () => {
    const params = {
      current_password: currentPassword,
      new_password: password,
      confirm_password: confirmPassword,
    };
    for (let key in params) {
      if (params[key] === '') {
        return (Platform.OS = 'android'
          ? ToastAndroid.show('Required field is empty', ToastAndroid.SHORT)
          : Alert.alert('Required field is empty'));
      }
    }

    // Password Length
    if (password.length < 8) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
            'Password should atleast 8 character long',
            ToastAndroid.SHORT,
          )
        : Alert.alert('Password should atleast 8 character long');
    }
    if (password != confirmPassword) {
      return (Platform.OS = 'android'
        ? ToastAndroid.show('passwords MissMatched !', ToastAndroid.SHORT)
        : Alert.alert('passwords MissMatched !'));
    }

    const url = 'change-password';
    setIsLoading(true);
    const response = await Post(url, params, apiHeader(token));
    setIsLoading(false);
    if (response !== undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('Password changed successfully', ToastAndroid.SHORT)
        : alert('Password changed successfully');
    setCurrentPassword('')
    setPassword('')
    setConfirmPassword('')

    
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
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: moderateScale(100, 0.3),
            alignItems: 'center',
            width: '100%',
            paddingTop: moderateScale(50, 0.3),
            // backgroundColor  : 'red'
          }}>
          <View>
            {Object.keys(image).length > 0 ? (
              // console.log('fdaf'),
              <CustomImage source={{uri: image.uri}} style={styles.image} />
            ) : (
              <CustomImage
                style={styles.image}
                source={profileImage ? {uri : profileImage} :  require('../Assets/Images/user3.jpg')}
              />
            )}
            <TouchableOpacity
              onPress={() => {
                setShowModal(true);
              }}
              style={styles.edit}>
              <Icon
                name="pencil"
                as={FontAwesome}
                style={styles.icon2}
                color={Color.white}
                size={moderateScale(16, 0.3)}
              />
            </TouchableOpacity>
          </View>

       

          <CardContainer style={styles.container}>
          <TextInputWithTitle
              titleText={'Role'}
              placeholder={'Role'}
              setText={setUserRole}
              value={userRole}
              viewHeight={0.065}
              viewWidth={0.68}
              inputWidth={0.55}
              border={1}
              borderColor={'#1B5CFB45'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(20, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              elevation
              disable
            />
            <TextInputWithTitle
              titleText={'First Name'}
              placeholder={'First Name'}
              setText={setFirstName}
              value={firstName}
              viewHeight={0.065}
              viewWidth={0.68}
              inputWidth={0.55}
              border={1}
              borderColor={'#1B5CFB45'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(20, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              elevation
            />
            <TextInputWithTitle
              titleText={'Last Name'}
              placeholder={'Last Name'}
              setText={setLastName}
              value={lastName}
              viewHeight={0.065}
              viewWidth={0.68}
              inputWidth={0.55}
              border={1}
              borderColor={'#1B5CFB45'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(12, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              elevation
            />
            <TextInputWithTitle
              titleText={'Designation'}
              placeholder={'Designation'}
              setText={setDesignation}
              value={designation}
              viewHeight={0.065}
              viewWidth={0.68}
              inputWidth={0.55}
              border={1}
              borderColor={'#1B5CFB45'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(12, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              elevation
            />
            <TextInputWithTitle
              titleText={'Email'}
              placeholder={'Email'}
              setText={setEmail}
              value={email}
              viewHeight={0.065}
              viewWidth={0.68}
              inputWidth={0.55}
              border={1}
              borderColor={'#1B5CFB45'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(12, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              elevation
              disable
            />
            <TextInputWithTitle
              titleText={'Contact'}
              placeholder={'Contact'}
              setText={setContact}
              value={contact}
              viewHeight={0.065}
              viewWidth={0.68}
              inputWidth={0.55}
              border={1}
              borderColor={'#1B5CFB45'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(12, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              elevation
              disable
            />
          
            <CustomButton
              // textTransform={"capitalize"}
              text={
                isLoading ? (
                  <ActivityIndicator color={'#ffffff'} size={'small'} />
                ) : (
                  'Update'
                )
              }
              isBold
              textColor={Color.white}
              width={windowWidth * 0.75}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              onPress={EditProfile}
              bgColor={Color.themeColor}
              borderColor={Color.white}
              borderWidth={2}
              borderRadius={moderateScale(30, 0.3)}
              disabled={isLoading}

            />
          </CardContainer>
          <CardContainer style={styles.container}>
          <TextInputWithTitle
              titleText={'Current Password'}
              placeholder={'Current Password'}
              setText={setCurrentPassword}
              value={currentPassword}
              viewHeight={0.065}
              viewWidth={0.68}
              inputWidth={0.55}
              border={1}
              borderColor={'#1B5CFB45'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(12, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              elevation
              secureText
            />
            <TextInputWithTitle
              titleText={'New Password'}
              placeholder={'New Password'}
              setText={setPassword}
              value={password}
              viewHeight={0.065}
              viewWidth={0.68}
              inputWidth={0.55}
              border={1}
              borderColor={'#1B5CFB45'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(12, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              elevation
              secureText
            />
            <TextInputWithTitle
              titleText={'Confirm Password'}
              placeholder={'Confirm Password'}
              setText={setConfirmPassword}
              value={confirmPassword}
              viewHeight={0.065}
              viewWidth={0.68}
              inputWidth={0.55}
              border={1}
              borderColor={'#1B5CFB45'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(12, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(25, 0.3)}
              elevation
              secureText
            />
               <CustomButton
              // textTransform={"capitalize"}
              text={
                isLoading ? (
                  <ActivityIndicator color={'#ffffff'} size={'small'} />
                ) : (
                  'Change'
                )
              }
              isBold
              textColor={Color.white}
              width={windowWidth * 0.75}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              onPress={passwordReset}
              bgColor={Color.themeColor}
              borderColor={Color.white}
              borderWidth={2}
              borderRadius={moderateScale(30, 0.3)}
              disabled={isLoading}
            />
          </CardContainer>
        </KeyboardAwareScrollView>
        <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={setImage}
        />
        <Bottomtab/>
      </ImageBackground>
    </>
  );
};

const styles = ScaledSheet.create({
  container: {
    // width: windowWidth * 0.8,
    // height: windowHeight * 0.5,
    marginTop: moderateScale(10, 0.3),
    // maxHeight: windowHeight * 0.7,
    overflow: 'hidden',
    paddingVertical : moderateScale(20,0.3)
    // backgroundColor : 'themeColor'
  },
  userTypeContainer: {
    width: windowWidth * 0.7,
    // backgroundColor : Color.red,
    padding: moderateScale(10, 0.3),
    marginTop: moderateScale(10, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerContainer: {
    width: '48%',
    // backgroundColor : 'themeColor',
    // paddingVertical : moderateScale(5,0.3),
    flexDirection: 'row',
    alignItems: 'center',
  },

  edit: {
    backgroundColor: Color.themePink,
    width: moderateScale(25, 0.3),
    height: moderateScale(25, 0.3),
    position: 'absolute',
    bottom: moderateScale(5, 0.3),
    right: moderateScale(1, 0.3),
    borderRadius: moderateScale(12.5, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: moderateScale(100, 0.3),
    height: moderateScale(100, 0.3),
    borderRadius: moderateScale(49, 0.3),
    marginLeft: moderateScale(2.5, 0.3),
    marginTop: moderateScale(2.5, 0.3),
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
    borderColor: Color.themeColor,
    marginBottom: moderateScale(5, 0.3),
  },
  txt5: {
    color: Color.themeLightGray,

    fontSize: moderateScale(12, 0.6),
  },
  circle: {
    height: moderateScale(13, 0.3),
    width: moderateScale(13, 0.3),
    borderRadius: moderateScale(6.5, 0.3),
    borderWidth: 1,
    backgroundColor: Color.white,
    borderColor: Color.themePink,
    marginLeft: moderateScale(15, 0.3),
  },
  txt2: {
    fontSize: moderateScale(12, 0.3),
    color: Color.themeColor,
    fontWeight: 'bold',
    // backgroundColor : 'red'
  },
});

export default MyAccounts;
