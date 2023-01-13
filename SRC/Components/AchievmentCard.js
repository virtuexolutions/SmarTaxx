import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  Platform,
  ToastAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';

import {Icon, ScrollView} from 'native-base';
import CardContainer from '../Components/CardContainer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LineChart} from 'react-native-chart-kit';
import CustomImage from './CustomImage';
import ImageView from 'react-native-image-viewing';
import navigationService from '../navigationService';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const AchievmentCard = ({
  image,
  title,
  checked,
  onPress,
  fromOptions,
  type,
  completed,
  imagesArray,
  item,
}) => {
  const [ImageArrayCustom, setImageArrayCustom] = useState([]);
  // console.log("🚀 ~ file: AchievmentCard.js:41 ~ ImageArrayCustom", ImageArrayCustom)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setImageArrayCustom([]);
    if (fromOptions == undefined) {
      imagesArray.map((x, index) => {
        return setImageArrayCustom(prev => [...prev, {uri: x}]);
      });
    }
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.smallContainer]}>
      <View
        style={[
          styles.imageContainer,
          {
            borderWidth: 2,

            borderColor:
              checked == 1 ? 'green' : checked == 2 ? 'red' : 'white',
          },
        ]}>
        <CustomImage
          source={type == 'options' ? image : {uri: image}}
          resizeMode={fromOptions ? 'contain' : 'stretch'}
          style={[
            {
              width: fromOptions ? '100%' : '100%',
              height: fromOptions ? '70%' : '100%',
              // backgroundColor : 'green',
            },
          ]}
        />
      </View>

      <CustomText isBold style={[styles.txt4]}>
        {title}
      </CustomText>
      {completed && (
        <Icon
          name={'check'}
          as={AntDesign}
          color={'green.700'}
          size={moderateScale(30, 0.3)}
          style={{
            position: 'absolute',
            right: moderateScale(10, 0.3),
          }}
        />
      )}
      {!fromOptions && (
        <Icon
          name="md-documents-sharp"
          as={Ionicons}
          color={Color.themePink}
          size={moderateScale(15, 0.3)}
          style={{
            position: 'absolute',
            // alignSelf : 'flex-end',
            top: moderateScale(10, 0.3),
            right: moderateScale(5, 0.3),
            // zIndex : 1,
            // backgroundColor : 'red'
          }}
          onPress={() => {
            // console.log('hello');
            setIsVisible(true);
          }}
          hitSlop={moderateScale(20, 0.3)}
        />
      )}
      {[
        item?.taxpayer,
        item?.diligence_verification,
        item?.refund_dispersement,
        item?.payment_method,
        item?.internal_audit,
        item?.irs_status,
        item?.refund_invoice,
        item?.refferal,
      ].includes(1) &&
        item && (
          <CustomText
          onPress={()=>{
            navigationService.navigate('EmployeeReport',{userId : item?.id})
          }}
          isBold
            style={{
              position: 'absolute',
              bottom: moderateScale(3, 0.3),
              right: 4,
              fontSize: moderateScale(12, 0.3),
              color : Color.themeColor

            }}>
            View Report
          </CustomText>
        )}

      <ImageView
        images={ImageArrayCustom}
        imageIndex={0}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(false);
        }}
      />
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  Txt: {
    marginTop: moderateScale(10, 0.3),
    color: Color.themeBlack,
    fontSize: moderateScale(22, 0.6),
    textAlign: 'center',
  },

  smallContainer: {
    paddingHorizontal: moderateScale(15, 0.3),
    width: windowWidth * 0.9,
    height: windowHeight * 0.1,
    flexDirection: 'row',
    backgroundColor: Color.white,
    alignItems: 'center',
    // justifyContent: 'space-between',

    // marginRight: moderateScale(10, 0.3),
    borderRadius: moderateScale(10, 0.3),
    marginBottom: moderateScale(15, 0.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
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
    borderRadius: moderateScale(5, 0.3),
    // paddingHorizontal: moderateScale(5, 0.3),
    // paddingVertical: moderateScale(5, 0.3),
    // marginVertical: moderateScale(40, 0.3),
    // backgroundColor : 'red',
    width: 60,
    height: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    // alignItems : 'center'
  },

  txt4: {
    color: Color.themeColor,
    fontSize: moderateScale(12, 0.6),
    // fontWeight: '700',
    marginLeft: moderateScale(20, 0.3),
  },
});
