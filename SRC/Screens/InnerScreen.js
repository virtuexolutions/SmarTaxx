import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../Components/CustomButton';
import {AchievmentCard} from '../Components/AchievmentCard';
import CustomHeader from '../Components/CustomHeader';
import Bottomtab from '../Components/Bottomtab';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CardContainer from '../Components/CardContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import navigationService from '../navigationService';
import SignatureScreen from 'react-native-signature-canvas';
import CustomImage from '../Components/CustomImage';
import Modal from 'react-native-modal';
import RNFetchBlob from "rn-fetch-blob";

const InnerScreen = props => {
  const token = useSelector(state => state.authReducer.token);
  const name = props?.route?.params?.name;
  const id = props?.route?.params?._id;
  const ref = useRef();
  const [signature, setSignature] = useState(null);

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
  const [isLoading, setIsLoading] = useState(false);
  const [scannedImage, setScannedImage] = useState([]);
  const [signModalVisible, setSignModalVisible] = useState(false);

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
      type: 'Signature',
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

  const InnerScreenHandleSubmit = async () => {
    const body =
      name == 'Taxpayer or spouse'
        ? {
            receptionist_id: id,
            spouse_information: SSN,
            address: address,
            dependent: dependant,
            tax_document: documents,
            paystub: payStub,
            w2: w2,
            nec: NEC,
            morgage: morgage,
          }
        : name == 'Due Diligence verification'
        ? {
            receptionist_id: id,
            eitc: EITC,
            ctc: CTC,
            actc: ACTC,
            aotc: AOTC,
            irs_notes: irsNotes,
            signature: Signatures,
          }
        : name == 'Refund Dispersement'
        ? {
            receptionist_id: id,
            product: product,
            check: check,
            direct_deposit: directDeposit,
            green_card: greenDot,
            account_no: routing,
          }
        : name == 'Payment Method'
        ? {
            receptionist_id: id,
            out_of_pocket: outOfPocket,
            deduct_from_refund: deductFromRefund,
          }
        : name == 'Status of Internal Audit'
        ? {
            receptionist_id: id,
            failed: failed,
            intentional_failed: internationalFailed,
            passed: passed,
          }
        : name == 'IRS Status'
        ? {
            receptionist_id: id,
            accepted: accepted,
            rejected: rejected,
          }
        : name == 'Refund/ Invoice'
        ? {
            receptionist_id: id,
            federal_amount: federal,
            state_amount: state,
            preparation_fee: fee,
          }
        : {
            receptionist_id: id,
            name: completeName,
            phone: phoneNumber,
          };

    const urlTax = 'taxpayer';
    const urlDue = 'diligence_verification';
    const urlRefund = 'refund_dispersements';
    const urlPaymentMethod = 'payment_methods';
    const urlinternal = 'internal_audits';
    const urlIRS = 'irs_status';
    const urlRefund_invoice = 'refund_invoices';
    const urlRefferal = 'refferals';
    // console.log(body);

    for (let key in body) {
      if (['', null, undefined].includes(body[key])) {
        return Platform.OS == 'android'
          ? ToastAndroid.show('All fields are required', ToastAndroid.SHORT)
          : alert('All fields are required');
      }
    }
    const url_for_Api =
      name == 'Taxpayer or spouse'
        ? urlTax
        : name == 'Due Diligence verification'
        ? urlDue
        : name == 'Refund Dispersement'
        ? urlRefund
        : name == 'Payment Method'
        ? urlPaymentMethod
        : name == 'Status of Internal Audit'
        ? urlinternal
        : name == 'IRS Status'
        ? urlIRS
        : name == 'Refund/ Invoice'
        ? urlRefund_invoice
        : urlRefferal;

    console.log(
      '🚀 ~ file: InnerScreen.js:339 ~ InnerScreenHandleSubmit ~ url_for_Api',
      url_for_Api,
      body,
    );

    setIsLoading(true);
    const response = await Post(url_for_Api, body, apiHeader(token));
    setIsLoading(false);

    if (response != undefined) {
      navigationService.navigate('Options', {item: response?.data?.data});
      console.log(response?.data?.data);
    }
  };

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

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = signature => {
    console.log('here ==> in handle');
    setSignature(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    Platform.OS == 'android'
      ? ToastAndroid.show('No sign implemented', ToastAndroid.SHORT)
      : alert('no sign implenmeted');
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log('here ==> in handle clear success!');
  };

  const handleSave = async () => {
    if (Platform.OS === 'android') {
    var isReadGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
    }
    if (isReadGranted === PermissionsAndroid.RESULTS.GRANTED) {
      const dirs = RNFetchBlob.fs.dirs
      var image_data = signature.split('data:image/png;base64,');
      const filePath = dirs.DownloadDir+"/"+'signture'+new Date().getMilliseconds()+'.png'
      RNFetchBlob.fs.writeFile(filePath, image_data[1], 'base64')
      .then(() => {
        console.log("Successfuly saved to"+ filePath)
      })
      .catch((errorMessage) =>{
        console.log(errorMessage)
      })      }
        
      if (Platform.OS ==='ios') {
      const dirs = RNFetchBlob.fs.dirs
      console.log(dirs)
      var image_data = signature.split('data:image/png;base64,');
      const filePath = dirs.DocumentDir+"/"+'signature'+new Date().getMilliseconds()+'.png'
      RNFetchBlob.fs.writeFile(filePath, image_data[1], 'base64')
      .then(() => {
            RNFetchBlob.ios.previewDocument("file://"+filePath)
            console.log("Successfully saved to"+ filePath)
              })
      .catch((errorMessage) =>{
        console.log(errorMessage)
      })
      }
    }

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
          //  nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom : moderateScale(50,0.3)
            // backgroundColor : 'red'
          }}>
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
                paddingBottom:  moderateScale(70, 0.3),
                paddingHorizontal: moderateScale(10, 0.3),
              }}
              renderItem={({item, index}) => {
                return item?.type == 'Signature' ? (
                  <CustomButton
                    bgColor={Color.themePink}
                    borderColor={'white'}
                    borderWidth={1}
                    textColor={Color.white}
                    onPress={() => {
                      setSignModalVisible(true);
                    }}
                    width={windowWidth * 0.75}
                    height={windowHeight * 0.065}
                    text={'Add your Signature'}
                    fontSize={moderateScale(16, 0.3)}
                    borderRadius={moderateScale(30, 0.3)}
                    textTransform={'uppercase'}
                    // isGradient={true}
                    // alignSelfalignSelf={'flex-start'}
                    marginTop={moderateScale(20, 0.3)}
                  />
                ) : (
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
              ListFooterComponent={() => {
                return (
                  <>
                  
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
                      onPress={InnerScreenHandleSubmit}
                      bgColor={Color.themeColor}
                      borderRadius={moderateScale(30, 0.3)}
                    />
                  </>
                );
              }}
            />
          </CardContainer>
        </KeyboardAwareScrollView>
        <Bottomtab
          scannedImage={scannedImage}
          setScannedImage={setScannedImage}
        />
        <Modal
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          isVisible={signModalVisible}
          hasBackDrop={true}>
          <View
            style={{
              width: windowWidth * 0.95,
              height : windowHeight * 0.85,
              borderRadius: moderateScale(20, 0.3),
              backgroundColor: Color.white,
            }}>

            <SignatureScreen
            style={{
              height : windowHeight * 0.5,
              backgroundColor : 'red'
            }}
              ref={ref}
              // onEnd={handleEnd}
              onOK={handleOK}
              onEmpty={handleEmpty}
              onClear={handleClear}
              autoClear={true}
              descriptionText={'Draw Signature'}
              penColor={Color.themePink}
            />
            {signature &&
             <CustomButton
                      text={'Save Signature'}
                      textColor={Color.white}
                      width={windowWidth * 0.4}
                      height={windowHeight * 0.06}
                      marginTop={moderateScale(-20, 0.3)}
                      onPress={handleSave}
                      bgColor={Color.themeColor}
                      borderRadius={moderateScale(30, 0.3)}
                    />
            }
          </View>
        </Modal>
      </ImageBackground>
    </>
  );
};

export default InnerScreen;
const styles = ScaledSheet.create({
  cardContainer: {
    marginTop: moderateScale(20, 0.3),
    marginBottom: moderateScale(20, 0.3),
    // height : windowHeight * 0.7,
  },
});
