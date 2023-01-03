import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import CustomStatusBar from '../Components/CustomStatusBar';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {AchievmentCard} from '../Components/AchievmentCard';
import CustomHeader from '../Components/CustomHeader';
import Bottomtab from '../Components/Bottomtab';
import navigationService from '../navigationService';

const Options = props => {
  const [scannedImage, setScannedImage] = useState([]);

  const name = props?.route?.params?.name;
  const itemData = props?.route?.params?.item;
  console.log('🚀 ~ file: Options.js:16 ~ Options ~ itemData', itemData);

  const dummyData = [
    {
      name: 'Taxpayer or spouse',
      image: require('../Assets/Images/Taxpayer.png'),
      checkDone: 3,
      type: 'options',
      completed: itemData?.taxpayer,
    },
    {
      name: 'Due Diligence verification',
      image: require('../Assets/Images/Due.png'),
      checkDone: 3,
      type: 'options',
      completed: itemData?.diligence_verification,
    },
    {
      name: 'Refund Dispersement',
      image: require('../Assets/Images/dis.png'),
      checkDone: 3,
      type: 'options',
      completed: itemData?.refund_dispersement,
    },
    {
      name: 'Payment Method',
      image: require('../Assets/Images/Payment.png'),
      checkDone: 3,
      type: 'options',
      completed: itemData?.payment_method,
    },
    {
      name: 'Status of Internal Audit',
      image: require('../Assets/Images/status.png'),
      checkDone: 3,
      type: 'options',
      completed: itemData?.internal_audit,
    },
    {
      name: 'IRS Status',
      image: require('../Assets/Images/irs.png'),
      checkDone: 3,
      type: 'options',
      completed: itemData?.irs_status,
    },
    {
      name: 'Refund/ Invoice',
      image: require('../Assets/Images/invoice.png'),
      checkDone: 3,
      type: 'options',
      completed: itemData?.refund_invoice,
    },
    {
      name: 'Refferal',
      image: require('../Assets/Images/irs.png'),
      checkDone: 3,
      type: 'options',
      completed: itemData?.refferal,
    },
  ];


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
          leftIcon
          // RightIcon
          text={name}
        />

        <FlatList
          data={dummyData}
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
                image={item.image}
                title={item.name}
                checked={item.checkDone}
                fromOptions={true}
                type={item?.type}
                completed={item?.completed == 0 ? false : true}
                onPress={() => {
                  navigationService.navigate('InnerScreen', {
                    name: item?.name,
                    _id: itemData?.id,
                  });
                }}
              />
            );
          }}
        />
        <Bottomtab
          scannedImage={scannedImage}
          setScannedImage={setScannedImage}
        />
      </ImageBackground>
    </>
  );
};

export default Options;
