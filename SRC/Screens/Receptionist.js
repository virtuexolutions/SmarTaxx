import {ActivityIndicator, BackHandler, ImageBackground, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomHeader from '../Components/CustomHeader';
import CardContainer from '../Components/CardContainer';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import Color from '../Assets/Utilities/Color';
import ListModal from '../Components/ListModal';
import navigationService from '../navigationService';
import {useSelector} from 'react-redux';
import Bottomtab from '../Components/Bottomtab';
import {Post} from '../Axios/AxiosInterceptorFunction';
import ImagePickerModal from '../Components/ImagePickerModal';
import CustomImage from '../Components/CustomImage';
import { FlatList, Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomAlertModal from '../Components/CustomAlertModal';
import { useEffect } from 'react';

const Receptionist = () => {
  const user = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [ssn, setSSN] = useState('');
  const [crossLink, setCrossLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisble] = useState(false);
  const [image, setImage] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [visible , setVisible] = useState(false);
  const [multiImages , setMultiImages] = useState([]) ;
  console.log("???? ~ file: Receptionist.js:42 ~ Receptionist ~ multiImages", JSON.stringify(multiImages,null,2))
  const [showMultiImageModal , setShowMultiImageModal] = useState(false);

  
  const saveRecord = async () => {
    const url = 'receptionist';
    const body = {
      first_name: `${firstName}`,
      last_name: `${lastName}`,
      ssn: ssn,
      cross_link: crossLink,
      image: image,
      // photos : multiImages,
   };
    
    const formData = new FormData();

    for (let key in body) {
      if (body[key] == '' || Object.keys(body[key]).length <=0) {
        return alert(`${key} is required`);
      }
      formData.append(key, body[key]);
    }
    for (var i = 0; i < multiImages.length; i++)
    {
      if (multiImages[i] == '' || Object.keys(multiImages[i]).length <=0) {
        return alert(`${key} is required`);
      }
      formData.append(`photos[${i}]`, multiImages[i]);
    }
    

    console.log('dfasdasfasdasdasdasdad === > ',formData);
    if(isNaN(ssn)){
      return alert('SSN must be in numbers');
    }
    if(ssn.length > 4 || ssn.length < 4){
      return alert('SSN must be of 4 digits');
    }

    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token, true));
    setIsLoading(false);
    if(response != undefined){
     Platform.OS == 'android' ?
     ToastAndroid.show('Record added successfully' , ToastAndroid.SHORT) : alert('Record added successfully')
     navigationService.navigate('Thankyou');

    }
  };
  useEffect(() => {

    BackHandler.addEventListener('hardwareBackPress', ()=>{
      setVisible(true)
    })

  }, [])

  return (
    <>
      <CustomStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ImageBackground
        style={{
          flex: 1,
          width: windowWidth,
          height: windowHeight,
          // alignItems: 'center',
        }}
        resizeMode={'stretch'}
        source={require('../Assets/Images/imageBackground.png')}>
      
      <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom : moderateScale(100,0.3),
        // width : '100%',
        // backgroundColor : 'red'
      }}
      >
        <CustomHeader
          // leftIcon
          // RightIcon
          text={`${user?.first_name} ${user?.last_name}`}
        />

        <CardContainer style={styles.container}>
          <View>
            {Object.keys(image).length > 0 ? (
              <CustomImage source={{uri: image.uri}} style={styles.image} />
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
            onPressLeft={() => {
              setIsVisble(true);
            }}
            disable
          />
          <View style={styles.imagesContainer}>
            <FlatList
            horizontal
            data={multiImages}
            showsHorizontalScrollIndicator={false}
            style={{
              // backgroundColor : 'red',
              flexGrow : 0
            }}
            renderItem={({item , index}) => {
              console.log("???? ~ file: Receptionist.js:342 ~ Receptionist ~ item", item?.uri)
            
              return(
                <View style={[styles.addImageContainer,{borderWidth : 0 , borderRadius : moderateScale(10,0.3)}]}>
                <Icon
                name={'close'}
                as={FontAwesome}
                color={Color.themeColor}
                size={moderateScale(12,0.3)}
                style={{
                  position : 'absolute',
                  right : 1,
                  top : 1,
                  zIndex : 1
                }}
                onPress={()=>{
                  let newArray = [...multiImages];
                  newArray.splice(index , 1);
                   setMultiImages(newArray);
                }}
                />  
                  {/* <CustomImage source={{uri: item.uri}}  /> */}
                <CustomImage
                source={{uri : item?.uri}}
                resizeMode={'stretch'}
                style={{
                  width : moderateScale(50,0.3),
                  height : moderateScale(60,0.3)
                }}
                
                />
                {/* <Icon
                name={'images'}
                as={Entypo}
                color={Color.themeColor}
                size={moderateScale(25,0.3)}
                /> */}
              </View>
              )
            }}
            />

            <View style={styles.addImageContainer}>
              <Icon
              name={'plus'}
              as={AntDesign}
              color={Color.themeColor}
              size={moderateScale(30,0.3)}
              onPress={()=>{
                setShowMultiImageModal(true);
              }}
              />
            </View>
          </View>



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
              saveRecord();
            }}
            bgColor={Color.themeColor}
            borderRadius={moderateScale(30, 0.3)}
          />
        </CardContainer>
        </KeyboardAwareScrollView>
        <ListModal
          isModalVisible={isVisible}
          setIsModalVisible={setIsVisble}
          title={'CrossLink Clay'}
          listArray={[
            'Option 1',
            'Option 2',
            'Option 3',
            'Option 4',
            'Option 5',
            'Option 6',
          ]}
          data={crossLink}
          setData={setCrossLink}
        />
        <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={setImage}
        />
          <ImagePickerModal
          show={showMultiImageModal}
          setShow={setShowMultiImageModal}
          setMultiImages={setMultiImages}
          // setFileObject={setImage}
          
        />
        <Bottomtab />
        <CustomAlertModal
        isModalVisible={visible}
        onClose={() => {
       
          setVisible(false);
        }}
        onOKPress={() => {
        BackHandler.exitApp()
        }}
        title={'Are you sure !!'}
        message={
          'You Want to exit the App ?'
        }
        iconType={2}
        areYouSureAlert
      />
      </ImageBackground>
    </>
  );
};

export default Receptionist;

const styles = ScaledSheet.create({
  container: {
    paddingVertical : moderateScale(20,0.3),
    // width: windowWidth * 0.8,
    // height: windowHeight * 0.5,
    marginTop: moderateScale(30, 0.3),
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
  addImageContainer : {
    width : windowWidth * 0.14 ,
    backgroundColor : Color.white,
    borderRadius : moderateScale(5,0.3),
    borderWidth : 2,
    borderColor : Color.themePink,
    height : windowHeight * 0.07,
    justifyContent : 'center',
    alignItems : 'center',
    marginRight : moderateScale(10,0.3),
    marginTop : moderateScale(5,0.3),
    shadowColor: Color.themeColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    
    elevation: 9,
    overflow : 'hidden'
  },
  imagesContainer : {
    marginTop : moderateScale(10,0.3),
    width : windowWidth * 0.7,
    marginLeft : moderateScale(10,0.3),
    flexWrap : 'wrap',
    flexDirection : 'row'

  },
});
