import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, ImageBackground, Text, View} from 'react-native';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Icon } from 'native-base';
import navigationService from '../navigationService';
import DocumentScanner from 'react-native-document-scanner-plugin'
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogOut } from '../Store/slices/common';
import { setUserLogoutAuth } from '../Store/slices/auth';






const Bottomtab = ({scannedImage , setScannedImage}) => {
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.commonReducer.userData)
    const scanDocument = async () => {
        // start the document scanner
        const { scannedImages } = await DocumentScanner.scanDocument()
      
        // get back an array with scanned image file paths
        if (scannedImages.length > 0) {
          // set the img src, so we can view the first scanned image
          setScannedImage(scannedImages[0])
        }
      }
  return (
    <View style={styles.container}>
        <Icon
        name='home'
        as={FontAwesome}
        color={Color.themePink}
        size={moderateScale(30,0.3)}
        onPress={()=>{
            navigationService.navigate(user?.role == 'Receptionist' ? 'Receptionist' : 'InternalAuditor')
        }}

/>
<Icon
        name='scan1'
        as={AntDesign}
        color={Color.themePink}
        size={moderateScale(30,0.3)}
        onPress={scanDocument}
        
/>
<Icon
        name='user'
        as={Entypo}
        color={Color.themePink}
        size={moderateScale(30,0.3)}
        onPress={()=>{
            navigationService.navigate('MyAccounts')
        }}
        
/>
<Icon
        name='log-out'
        as={Entypo}
        color={Color.themePink}
        size={moderateScale(30,0.3)}
        onPress={()=>{
          dispatch(setUserLogOut())
         dispatch(setUserLogoutAuth())
        }}
        
/>
     
    </View>
  )
}

const styles = ScaledSheet.create({
    container : {
        position : 'absolute',
        bottom : moderateScale(20,0.3),
        // alignSelf : 'center',
        width : windowWidth * 0.9,
        height : windowHeight * 0.1 ,
        borderRadius  : moderateScale(30,0.3),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        backgroundColor : 'rgba(255,255,255,0.9)',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingHorizontal : moderateScale(20,0.3),
        alignSelf : 'center'
    },
})
export default Bottomtab
