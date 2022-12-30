import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomStatusBar from '../Components/CustomStatusBar';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomHeader from '../Components/CustomHeader';
import CardContainer from '../Components/CardContainer';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../Assets/Utilities/Color';
import ListModal from '../Components/ListModal';
import navigationService from '../navigationService';
import ImagePickerModal from '../Components/ImagePickerModal';
import CustomImage from '../Components/CustomImage';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomText from '../Components/CustomText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [designation, setDesignation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({});
  const [userRole, setUserRole] = useState('Receptionist');
  const [showModal, setShowModal] = useState(false);
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

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
              paddingBottom: moderateScale(20, 0.3),
              alignItems: 'center',
              width: '100%',
              paddingTop: moderateScale(50, 0.3),
              // backgroundColor  : 'red'

            }}>
        <View>
          {Object.keys(image).length > 0 ? (
            <CustomImage source={{uri: image?.uri}} style={styles.image} />
          ) : (
            <CustomImage
              style={styles.image}
              source={require('../Assets/Images/user3.jpg')}
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

        <View style={styles.userTypeContainer}>
              <View style={styles.innerContainer}>
                <CustomText style={styles.txt2}>Receptionist</CustomText>
                <TouchableOpacity
                  onPress={() => {
                    setUserRole('Receptionist');
                  }}
                  activeOpacity={0.9}
                  style={[
                    styles.circle,
                    userRole == 'Receptionist' && {
                      backgroundColor: Color.themePink,
                      borderColor : Color.themeColor
                    },
                  ]}></TouchableOpacity>
              </View>
              <View style={styles.innerContainer}>
                <CustomText style={styles.txt2}>Internal Auditor</CustomText>
                <TouchableOpacity
                  onPress={() => {
                    setUserRole('Internal Auditor');
                  }}
                  activeOpacity={0.9}
                  style={[
                    styles.circle,
                    userRole == 'Internal Auditor' && {
                      backgroundColor: Color.themePink,
                      borderColor : Color.themeColor
                    },
                  ]}></TouchableOpacity>
              </View>
            </View>

        
        <CardContainer style={styles.container}>
          

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
            />
            <TextInputWithTitle
              titleText={'Password'}
              placeholder={'Password'}
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
            />
            <CustomButton
              text={
                isLoading ? (
                  <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                ) : (
                  'Sign Up'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.7}
              height={windowHeight * 0.06}
              marginTop={moderateScale(20, 0.3)}
              onPress={() => {
                navigationService.navigate('Thankyou');
              }}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(30, 0.3)}
            />
            <View style={styles.container2}>
              <CustomText style={styles.txt5}>
                {'Already have an account? '}
              </CustomText>
              <TouchableOpacity
                style={{marginLeft: windowWidth * 0.01}}
                onPress={() => navigationService.navigate('LoginScreen')}>
                <CustomText style={styles.txt4}>{'Sign In'}</CustomText>
              </TouchableOpacity>
            </View>
        </CardContainer>
          </KeyboardAwareScrollView>
        <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={setImage}
        />
      </ImageBackground>
    </>
  );
};

export default Signup;

const styles = ScaledSheet.create({
  container: {
    // width: windowWidth * 0.8,
    // height: windowHeight * 0.5,
    marginTop: moderateScale(10, 0.3),
    maxHeight: windowHeight * 0.7,
    overflow: 'visible',
    // backgroundColor : 'green'
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
    // backgroundColor : 'green',
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
    marginBottom : moderateScale(5,0.3)
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
    fontWeight : 'bold'
    // backgroundColor : 'red'
  },
});
