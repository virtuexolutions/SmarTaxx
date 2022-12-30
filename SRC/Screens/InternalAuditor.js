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

const InternalAuditor = () => {
  const [scannedImage,setScannedImage] = useState([]);
  console.log("🚀 ~ file: InternalAuditor.js:16 ~ InternalAuditor ~ scannedImage", scannedImage)



    const dummyData=[
        {
            name : 'Bradley D. Harvey',
            image : require('../Assets/Images/dummyUser.png'),
            checkDone : 2
        },
        {
            name : 'Dawn C. Peterson',
            image : require('../Assets/Images/dummyUser1.png'),
            checkDone : 1
        },
        {
            name : 'David L. Newberry',
            image : require('../Assets/Images/dummyUser.png'),
            checkDone : 2
        },
        {
            name : 'Nellie D. Hendrickson',
            image : require('../Assets/Images/dummyUser1.png'),
            checkDone : 1
        },
        {
            name : 'Dean K. Kim',
            image : require('../Assets/Images/dummyUser.png'),
            checkDone : 2
        },
        {
            name : 'Robert T. Pearman',
            image : require('../Assets/Images/dummyUser1.png'),
            checkDone : 2
        },
        {
            name : 'Robert T. Pearman',
            image : require('../Assets/Images/dummyUser.png'),
            checkDone : 2
        }
        ,
        {
            name : 'Bradley D. Harvey',
            image : require('../Assets/Images/dummyUser1.png'),
            checkDone : 2
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
        // leftIcon
        // RightIcon
        text={'Aaron L. Cooper'}
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
            onPress={()=>{navigationService.navigate('Options',{name : item?.name})}}
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

export default InternalAuditor

