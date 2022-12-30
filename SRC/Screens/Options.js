import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, ImageBackground, Text, View} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CustomButton from '../Components/CustomButton';
import { AchievmentCard } from '../Components/AchievmentCard';
import CustomHeader from '../Components/CustomHeader';
import Bottomtab from '../Components/Bottomtab';
import navigationService from '../navigationService';
import InnerScreen from './InnerScreen';

const Options = (props) => {
    const [scannedImage,setScannedImage] = useState([]);

    const name = props?.route?.params?.name;



    const dummyData=[
        {
            name : 'Taxpayer or spouse',
            image : require('../Assets/Images/Taxpayer.png'),
            checkDone : 3,
            type : FontAwesome
        },
        {
            name : 'Due Diligence verification',
            image : require('../Assets/Images/Due.png'),
            checkDone : 3,
            type : FontAwesome
        },
        {
            name : 'Refund Dispersement',
            image : require('../Assets/Images/dis.png'),
            checkDone : 3,
            type : FontAwesome
        },
        {
            name : 'Payment Method',
            image : require('../Assets/Images/Payment.png'),
            checkDone : 3,
            type : FontAwesome
        },
        {
            name : 'Status of Internal Audit',
            image : require('../Assets/Images/status.png'),
            checkDone : 3,
            type : FontAwesome
        },
        {
            name : 'IRS Status',
            image : require('../Assets/Images/irs.png'),
            checkDone : 3,
            type : FontAwesome
        },
        {
            name : 'Refund/ Invoice',
            image : require('../Assets/Images/invoice.png'),
            checkDone : 3,
            type : FontAwesome,
        },
        {
            name : 'Refferal',
            image : require('../Assets/Images/irs.png'),
            checkDone : 3,
            type : FontAwesome,
        }
      
    ]




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
        leftIcon
        // RightIcon
        text={name}
      />

      <FlatList
      data={dummyData}
      showsVerticalScrollIndicator={false}
      style={{
        width : windowWidth
      }}
      contentContainerStyle={{
        alignItems : 'center',
        paddingTop : moderateScale(20,0.3),
        paddingBottom : moderateScale(100,0.3)
      }}
      renderItem={({item , index})=>{
        return(
            <AchievmentCard
            image={item.image}
            title={item.name}
            checked={item.checkDone}
            fromOptions={true}
            type={item?.type}
            onPress={()=>{
                navigationService.navigate('InnerScreen',{name : item?.name})
            }}
            />
        )
      }}


      
      />
      <Bottomtab
        scannedImage={scannedImage}
        setScannedImage={setScannedImage}
      />

     
    </ImageBackground>
  </>
  )
}

export default Options

