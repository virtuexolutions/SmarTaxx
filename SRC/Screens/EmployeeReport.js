import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ScrollView,
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
import { Get } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
import CardContainer from '../Components/CardContainer';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';

const EmployeeReport = (props) => {
    const token = useSelector((state)=>state.authReducer.token)
  const [isLoading , setIsLoading] = useState(false);
  const [data , setData] = useState([]);
  console.log( data)
  const user_id = props?.route?.params?.userId;
 
 


    const getEmployeeData = async ()=>{
      const url = `receptionist/detail/${user_id}`;
      setIsLoading(true);
      const response = await Get(url , token);
      setIsLoading(false);

      if(response != undefined){
        console.log(JSON.stringify(response?.data?.receptionist , null , 2));
        setData(response?.data?.receptionist);
      }




    }


    useEffect(() => {
      getEmployeeData()
    }, [])
    

    
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
          text={'Employee Report'}
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
        

        <CardContainer style={{
          // paddingVertical : moderateScale(10,0.3),
          marginTop : moderateScale(30,0.3),
          maxHeight : windowHeight * 0.68
        }} >
          <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width : '100%',
            paddingTop : moderateScale(20,0.3),
            paddingBottom : moderateScale(40,0.3),
            // backgroundColor : 'red',
            alignItems : 'center'
          }}
          >
            <CustomImage source={{uri: data.image}} style={styles.image} />
            <View style={[styles.row,{marginTop : moderateScale(20,0.3)}]}>
            <CustomText isBold style={styles.subHeading}>Name</CustomText>
            <CustomText style={styles.rawdata}>{`${data?.first_name} ${data?.last_name}`}</CustomText>
          </View>
          <View style={[styles.row]}>
            <CustomText isBold style={styles.subHeading}>SSN</CustomText>
            <CustomText style={styles.rawdata}>{`${data?.ssn}`}</CustomText>
          </View>
          <View style={[styles.row]}>
            <CustomText isBold style={styles.subHeading}>Software</CustomText>
            <CustomText style={styles.rawdata}>{data?.cross_link}</CustomText>
          </View>
          {data?.taxpayer == 1 && 
          <>
          <CustomText isBold style={styles.heading}>Tax payer</CustomText>
          <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>spouse info</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.tax_payer[0].spouse_information}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>Address</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.tax_payer[0].address}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>Dependent</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.tax_payer[0].dependent}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>Tax Document</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.tax_payer[0].tax_document}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>Pay Stub</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.tax_payer[0].paystub}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>W2</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.tax_payer[0].w2}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>nec</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.tax_payer[0].nec}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>morgage</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.tax_payer[0].morgage}</CustomText>
        </View>
          </>

}
{data?.diligence_verification == 1 && 
          <>
          <CustomText isBold style={styles.heading}>diligence verification</CustomText>
          <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>eitc</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.diligenceverification[0].eitc}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>ctc</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.diligenceverification[0].ctc}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>actc</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.diligenceverification[0].actc}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>aotc</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.diligenceverification[0].aotc}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>irs notes</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.diligenceverification[0].irs_notes}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>Signature</CustomText>
          <CustomImage
                      resizeMode={"contain"}
                      style={{ width: windowWidth * 0.2, height: windowHeight * 0.06 , borderWidth : 1 , borderColor : Color.themeColor}}
                      source={{ uri: data?.diligenceverification[0].signature }}
                    />
        </View>
       
          </>
          

}
{data?.internal_audit == 1 && 
          <>
          <CustomText isBold style={styles.heading}>Status of internal audit</CustomText>
          <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>failed</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.internalaudit[0].failed}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>Address</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.internalaudit[0].intentional_failed}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>Dependent</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.internalaudit[0].passed}</CustomText>
        </View>
       
          </>

}
{data?.irs_status == 1 && 
          <>
          <CustomText isBold style={styles.heading}>IRS status</CustomText>
          <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>accepted</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.irsstatus[0].accepted}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>rejected</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.irsstatus[0].rejected}</CustomText>
        </View>
      
       
          </>

}
{data?.payment_method == 1 && 
          <>
          <CustomText isBold style={styles.heading}>Payment method</CustomText>
          <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>out of pocket</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.paymentmethod[0].out_of_pocket}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>deduct from refund</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.paymentmethod[0].deduct_from_refund}</CustomText>
        </View>
      
       
          </>

}
{data?.refund_invoice == 1 && 
          <>
          <CustomText isBold style={styles.heading}>Refund invoice</CustomText>
          <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>federal amount</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.refund_invoices[0].federal_amount}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>state amount</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.refund_invoices[0].state_amount}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>preparation fee</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.refund_invoices[0].preparation_fee}</CustomText>
        </View>
      
       
          </>

}
{data?.refund_dispersement == 1 && 
          <>
          <CustomText isBold style={styles.heading}>Refund Dispersement</CustomText>
          <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>RT product</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.refund_dispersements[0].product}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>RT check</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.refund_dispersements[0].check}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>RT direct deposit</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.refund_dispersements[0].direct_deposit}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>RT green card</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.refund_dispersements[0].green_card}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>account no</CustomText>
          <CustomText numberOfLines={2} style={styles.rawdata}>{data?.refund_dispersements[0].account_no}</CustomText>
        </View>

      
       
          </>

}
{data?.refferal == 1 && 
          <>
          <CustomText isBold style={styles.heading}>Refferal</CustomText>
          <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>name</CustomText>
          <CustomText numberOfLines={1} style={styles.rawdata}>{data?.refferals[0].name}</CustomText>
        </View>
        <View style={[styles.row]}>
          <CustomText numberOfLines={1} isBold style={styles.subHeading}>contact</CustomText>
          <CustomText numberOfLines={1} style={styles.rawdata}>{data?.refferals[0].phone}</CustomText>
        </View>
     
      
       
          </>

}
</ScrollView>
        </CardContainer>
        )}

       
      </ImageBackground>
    </>
  )
}

export default EmployeeReport

const styles = ScaledSheet.create({
  heading : {
    alignSelf : 'flex-start',
    fontSize : moderateScale(20,0.3),
    color : Color.black,
    marginLeft : moderateScale(20,0.3),
    width : windowWidth * 0.8,
    textDecorationLine : 'underline',
    marginTop : moderateScale(20,.3),
    marginBottom : moderateScale(10,0.3)
    // backgroundColor : 'red'
  }
  ,
  image: {
    width: moderateScale(100, 0.3),
    height: moderateScale(100, 0.3),
    borderRadius: moderateScale(49, 0.3),
    marginLeft: moderateScale(2.5, 0.3),
    marginTop: moderateScale(2.5, 0.3),
  },
  row : {
    flexDirection : 'row',
    alignSelf : 'flex-start',

  },
  subHeading :{
    fontSize : moderateScale(13,0.3),
    color : Color.black,
    marginLeft : moderateScale(20,0.3),
    width : windowWidth * 0.3,
    

  },
  rawdata : {
    color : Color.black,
    fontSize : moderateScale(12,0.3),
    lineHeight : moderateScale(20,0.3),
    marginLeft : moderateScale(10,0.3)


  },
})