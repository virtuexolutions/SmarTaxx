import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
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
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CardContainer from '../Components/CardContainer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const InnerScreen = props => {
  const name = props?.route?.params?.name;

  //states for TaxPayer
  const [SSN, setSSN] = useState('');
  const [address, setAddress] = useState('');
  const [dependant, setDependant] = useState('');
  const [documents, setDocuments] = useState('');
  const [payStub, setPayStub] = useState('');
  const [w2, setW2] = useState('');
  const [NEC, setNEC] = useState('');
  const [morgage, setMorgage] = useState('');

  //states for Due Diligence
  const [EITC, setEITC] = useState('');
  const [CTC, setCTC] = useState('');
  const [ACTC, setACTC] = useState('');
  const [AOTC, setAOTC] = useState('');
  const [irsNotes, setIrsNotes] = useState('');
  const [Signatures, setSignatures] = useState('');

  //states for Refund Dispersemnet
  const [product, setProduct] = useState('');
  const [check, setCheck] = useState('');
  const [directDeposit, setDirectDeposit] = useState('');
  const [greenDot, setGreenDot] = useState('');
  const [routing, setRouting] = useState('');

  //states for Payment Method
  const [outOfPocket, setOutOfPocket] = useState('');
  const [deductFromRefund, setDeductFromRefund] = useState('');

  //states for Status of internal audit
  const [failed, setFailed] = useState('');
  const [internationalFailed, setInternationalFailed] = useState('');
  const [passed, setPassed] = useState('');

  //states for IRS status
  const [accepted, setAccepted] = useState('');
  const [rejected, setRejected] = useState('');

  //states for Refund
  const [federal, setFederal] = useState('');
  const [state, setState] = useState('');
  const [fee, setFee] = useState('');

  //states for Referral
  const [completeName, setCompleteName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

//   const [arrayForFlatList, setArrayForFlatList] = useState([]);
//   console.log("🚀 ~ file: InnerScreen.js:72 ~ InnerScreen ~ arrayForFlatList", arrayForFlatList)
  const [isLoading ,setIsLoading] = useState(false)
  const [scannedImage,setScannedImage] = useState([]);

  const Due_Diligence = [
    {
      name: 'EITC',
      data: EITC,
      setData: setEITC,
    },
    {
      name: 'CTC',
      data: CTC,
      setData: setCTC,
    },
    {
      name: 'ACTC',
      data: ACTC,
      setData: setACTC,
    },
    {
      name: 'AOTC',
      data: AOTC,
      setData: setAOTC,
    },
    {
      name: 'IRS Notes on File',
      data: irsNotes,
      setData: setIrsNotes,
    },
    {
      name: 'Signatures (Taxpayer or spouse) & (Preparer)',
      data: Signatures,
      setData: setSignatures,
    },
  ];
  const TaxPayer = [
    {
      name: 'Taxpayer or spouse information (SSN, Drivers License)',
      data: SSN,
      setData: setSSN,
    },
    {
      name: 'Address',
      data: address,
      setData: setAddress,
    },
    {
      name: 'Dependent(s) SSN card on file, birth certificates',
      data: dependant,
      setData: setDependant,
    },
    {
      name: 'Tax documents',
      data: documents,
      setData: setDocuments,
    },
    {
      name: 'Paystub',
      data: payStub,
      setData: setPayStub,
    },
    {
      name: 'W2',
      data: w2,
      setData: setW2,
    },
    {
      name: '1099 (NEC, MISC, R, C, S, K, B, DIV, INT)',
      data: NEC,
      setData: setNEC,
    },
    {
      name: '1098 (Morgage, T, E)',
      data: morgage,
      setData: setMorgage,
    },
  ];
  const Refund_Dispersement = [
    {
      name: 'RT product',
      data: product,
      setData: setProduct,
    },
    {
      name: 'RT check',
      data: check,
      setData: setCheck,
    },
    {
      name: 'RT direct deposit',
      data: directDeposit,
      setData: setDirectDeposit,
    },
    {
      name: 'RT Green dot card',
      data: greenDot,
      setData: setGreenDot,
    },
    {
      name: 'Routing & Account Number',
      data: routing,
      setData: setRouting,
    },
  ];
  const Payment_Method = [
    {
      name: 'Out of pocket',
      data: outOfPocket,
      setData: setOutOfPocket,
    },
    {
      name: 'Deduct From Refund',
      data: deductFromRefund,
      setData: setDeductFromRefund,
    },
  ];
  const internal_audit = [
    {
      name: 'Failed',
      data: failed,
      setData: setFailed,
    },
    {
      name: 'Intentional Failed',
      data: internationalFailed,
      setData: setInternationalFailed,
    },
    {
      name: 'Passed',
      data: passed,
      setData: setPassed,
    },
  ];
  const IRS_status = [
    {
      name: 'Accepted',
      data: accepted,
      setData: setAccepted,
    },
    {
      name: 'Rejected',
      data: rejected,
      setData: setRejected,
    },
  ];
  const Refund_Invoice = [
    {
      name: 'Federal Refund Amount',
      data: federal,
      setData: setFederal,
    },
    {
      name: 'State Refund Amount',
      data: state,
      setData: setState,
    },
    {
      name: 'Preparation Fee',
      data: fee,
      setData: setFee,
    },
  ];
  const Referral = [
    {
      name: 'Complete name',
      data: completeName,
      setData: setCompleteName,
    },
    {
      name: 'phone number',
      data: phoneNumber,
      setData: setPhoneNumber,
    },
  ];

//   useEffect(() => {
//     name == 'Taxpayer or spouse'
//       ? setArrayForFlatList(TaxPayer)
//       : name == 'Due Diligence verification'
//       ? setArrayForFlatList(Due_Diligence)
//       : name == 'Refund Dispersement'
//       ? setArrayForFlatList(Refund_Dispersement)
//       : name == 'Payment Method'
//       ? setArrayForFlatList(Payment_Method)
//       : name == 'Status of Internal Audit'
//       ? setArrayForFlatList(internal_audit)
//       : name == 'IRS Status'
//       ? setArrayForFlatList(IRS_status)
//       : name == 'Refund/ Invoice'
//       ? setArrayForFlatList(Refund_Invoice)
//       : setArrayForFlatList(Referral);

//     return () => {
//       setArrayForFlatList([]);
//     };
//   }, []);

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
          // alignItems: 'center',
        }}
        resizeMode={'stretch'}
        source={require('../Assets/Images/imageBackground.png')}>
       <KeyboardAwareScrollView
      //  nestedScrollEnabled={true}
       showsVerticalScrollIndicator={false}
      
       contentContainerStyle={{
        alignItems : 'center',
        // backgroundColor : 'red'
       }}
       >

        <CustomHeader
          leftIcon
          // RightIcon
          text={name}
        />
        <CardContainer style={styles.cardContainer}>
        
            <FlatList
            nestedScrollEnabled={true}
              data={
                name == 'Taxpayer or spouse'
                ? TaxPayer
                : name == 'Due Diligence verification'
                ? Due_Diligence
                : name == 'Refund Dispersement'
                ? Refund_Dispersement
                : name == 'Payment Method'
                ? Payment_Method
                : name == 'Status of Internal Audit'
                ? internal_audit
                : name == 'IRS Status'
                ? IRS_status
                : name == 'Refund/ Invoice'
                ? Refund_Invoice
                : Referral

              }
              showsVerticalScrollIndicator={false}
              style={{
                maxHeight: windowHeight * 0.7,
                // width: windowWidth,
              }}
              contentContainerStyle={{
                alignItems: 'center',
                paddingTop: moderateScale(20, 0.3),
                paddingBottom: moderateScale(70, 0.3),
                paddingHorizontal: moderateScale(10, 0.3),
              }}
              renderItem={({item, index}) => {
                return (
                  <TextInputWithTitle
                    titleText={item?.name}
                    placeholder={item?.name}
                    setText={item?.setData}
                    value={item?.data}
                    viewHeight={0.065}
                    viewWidth={0.75}
                    inputWidth={0.7}
                    border={1}
                    borderColor={'#1B5CFB45'}
                    backgroundColor={'#FFFFFF'}
                    marginTop={moderateScale(20, 0.3)}
                    color={Color.themeColor}
                    placeholderColor={Color.themeLightGray}
                    borderRadius={moderateScale(25, 0.3)}
                    elevation
                  />
                );
              }}
              ListFooterComponent={()=>{
                return(
                    <CustomButton
                    text={
                      isLoading ? (
                        <ActivityIndicator color={'#FFFFFF'} size={'small'} />
                      ) : (
                        'Submit'
                      )
                    }
                    textColor={Color.white}
                    width={windowWidth * 0.4}
                    height={windowHeight * 0.06}
                    marginTop={moderateScale(20, 0.3)}
                    onPress={() => {
                    //   navigationService.navigate('Thankyou');
                    alert('Action to be performed')
                    }}
                    bgColor={Color.themeColor}
                    borderRadius={moderateScale(30, 0.3)}
                  />
                )
              }}
            />
          
        
        </CardContainer>

        </KeyboardAwareScrollView>
        <Bottomtab 
        scannedImage={scannedImage}
        setScannedImage={setScannedImage}
        />

      </ImageBackground>
    </>
  );
};

const styles = ScaledSheet.create({
  cardContainer: {
    marginTop: moderateScale(20, 0.3),
    marginBottom : moderateScale(20,0.3)
    // height : windowHeight * 0.7,
  },
});
export default InnerScreen;
