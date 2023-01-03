import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../Components/CustomButton';
import {AchievmentCard} from '../Components/AchievmentCard';
import CustomHeader from '../Components/CustomHeader';
import Bottomtab from '../Components/Bottomtab';
import navigationService from '../navigationService';
import {useSelector} from 'react-redux';
import CustomImage from '../Components/CustomImage';
import {Get} from '../Axios/AxiosInterceptorFunction';
import CustomAlertModal from '../Components/CustomAlertModal';
import {useIsFocused} from '@react-navigation/native';

const InternalAuditor = () => {
  const user = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);

  const focused = useIsFocused();
  const [scannedImage, setScannedImage] = useState([]);
  // console.log(
  //   '🚀 ~ file: InternalAuditor.js:16 ~ InternalAuditor ~ scannedImage',
  //   scannedImage,
  // );
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [flatListArray , setFlatListArray] = useState([])
  // console.log("🚀 ~ file: InternalAuditor.js:39 ~ InternalAuditor ~ data", flatListArray)
  const [visible, setVisible] = useState(false);

  const dummyData = [
    {
      name: 'Bradley D. Harvey',
      image: require('../Assets/Images/dummyUser.png'),
      checkDone: 2,
    },
    {
      name: 'Dawn C. Peterson',
      image: require('../Assets/Images/dummyUser1.png'),
      checkDone: 1,
    },
    {
      name: 'David L. Newberry',
      image: require('../Assets/Images/dummyUser.png'),
      checkDone: 2,
    },
    {
      name: 'Nellie D. Hendrickson',
      image: require('../Assets/Images/dummyUser1.png'),
      checkDone: 1,
    },
    {
      name: 'Dean K. Kim',
      image: require('../Assets/Images/dummyUser.png'),
      checkDone: 2,
    },
    {
      name: 'Robert T. Pearman',
      image: require('../Assets/Images/dummyUser1.png'),
      checkDone: 2,
    },
    {
      name: 'Robert T. Pearman',
      image: require('../Assets/Images/dummyUser.png'),
      checkDone: 2,
    },
    {
      name: 'Bradley D. Harvey',
      image: require('../Assets/Images/dummyUser1.png'),
      checkDone: 2,
    },
  ];

  useEffect(() => {
    setFlatListArray([]);
    data.length > 0 &&
      data.map((item, index) =>{ [
        item?.taxpayer,
        item?.diligence_verification,
        item?.refund_dispersement,
        item?.payment_method,
        item?.internal_audit,
        item?.irs_status,
        item?.refund_invoice,
        item?.refferal,
      ].every((x)=>{return x ==1}) 
      ? 
    ( item.checkDone = 1 )
      :
     ( item.checkDone = 2)
   return setFlatListArray(prev=>[ ...prev , item])
    
     } );
  }, [data]);

  const getData = async () => {
    console.log('hererrrrr');
    const url = 'receptionist';
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
     response?.data?.receptionist.map((x,index)=>{
      return setData((prev)=>[...prev , {...x , checkDone : ''}])
     })
     
      // setData(response?.data?.receptionist);
    }
  };

  useEffect(() => {
    setData([])
    getData();
  }, [focused]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      setVisible(true);
    });
  }, []);

  return (
    <>
      <CustomStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
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
          // RightIcon
          text={`${user?.first_name} ${user?.last_name}` }
        />
        {isLoading ? (
          <View
            style={{
              width: windowWidth,
              height: windowHeight * 0.7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={Color.themeColor} size={'large'} />
          </View>
        ) : (
          <FlatList
            data={flatListArray}
            showsVerticalScrollIndicator={false}
            style={{
              width: windowWidth,
            }}
            contentContainerStyle={{
              alignItems: 'center',
              paddingTop: moderateScale(20, 0.3),
              paddingBottom: moderateScale(100, 0.3),
            }}
            renderItem={({item, index}) => {
              return (
                <AchievmentCard
                  image={item?.image}
                  title={`${item?.first_name} ${item?.last_name}`}
                  checked={item.checkDone}
                  onPress={() => {
                    navigationService.navigate('Options', {
                      name: `${item?.first_name} ${item?.last_name}`,
                      item: item,
                    });
                  }}
                />
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    height: windowHeight * 0.5,
                    width: windowWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomImage
                    source={require('../Assets/Images/not_found.png')}
                    resizeMode={'contain'}
                    style={{
                      width: windowWidth * 0.5,
                    }}
                  />
                </View>
              );
            }}
          />
        )}
        <Bottomtab
          scannedImage={scannedImage}
          setScannedImage={setScannedImage}
        />

        <CustomAlertModal
          isModalVisible={visible}
          onClose={() => {
            setVisible(false);
          }}
          onOKPress={() => {
            BackHandler.exitApp();
          }}
          title={'Are you sure !!'}
          message={'You Want to exit the App ?'}
          iconType={2}
          areYouSureAlert
        />
      </ImageBackground>
    </>
  );
};

export default InternalAuditor;
