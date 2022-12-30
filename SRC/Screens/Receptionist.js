import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomStatusBar from '../Components/CustomStatusBar';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomHeader from '../Components/CustomHeader';
import CardContainer from '../Components/CardContainer';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Color from '../Assets/Utilities/Color';
import ListModal from '../Components/ListModal';
import navigationService from '../navigationService';

const Receptionist = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [ssn, setSSN] = useState('');
  const [crossLink, setCrossLink] = useState('');
  const [isLoading , setIsLoading]=useState(false);
  const [isVisible , setIsVisble]=useState(false)

  return (
    <>
      <CustomStatusBar
       backgroundColor={'white'}
        barStyle={'dark-content'}
      />
      <ImageBackground
        style={{
          flex: 1,
          width: windowWidth,
          height: windowHeight,
          alignItems: 'center',
        }}
        resizeMode={'stretch'}
        source={require('../Assets/Images/imageBackground.png')}>
        <CustomHeader
          // leftIcon
          RightIcon
          text={'Aaron L. Cooper'}
        />

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
            marginTop={moderateScale(30, 0.3)}
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
            titleText={'Last 4 of Taxpayers SSN'}
            placeholder={'Last 4 of Taxpayers SSN'}
            setText={setSSN}
            value={ssn}
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
                iconName="down"
                iconType={AntDesign}
            titleText={'Crosslink Clay or Crosslink Jasper'}
            placeholder={'Crosslink Clay or Crosslink Jasper'}
            setText={setCrossLink}
            value={crossLink}
            viewHeight={0.065}
            viewWidth={0.68}
            inputWidth={0.55}
            border={1}
            borderColor={'#1B5CFB45'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(12, 0.3)}
            color={Color.themePink}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
            elevation
            rightIcon
            onPressLeft={()=>{
             setIsVisble(true)
            }}
            disable
/>
          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Submit'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.68}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
            navigationService.navigate('Thankyou')
            }}
            bgColor={Color.themeColor}
            borderRadius={moderateScale(30, 0.3)}
          />
        </CardContainer>
      <ListModal
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisble}
      title={'CrossLink Clay'}
      listArray={['Option 1','Option 2','Option 3','Option 4','Option 5','Option 6',]}
      data={crossLink}
      setData={setCrossLink}
     />
      </ImageBackground>
    </>
  );
};

export default Receptionist;

const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.5,
    marginTop: moderateScale(30, 0.3),
  },
});
