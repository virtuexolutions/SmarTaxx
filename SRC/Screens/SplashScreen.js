import React, { useCallback, useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import Color from "../Assets/Utilities/Color";
import CustomStatusBar from "../Components/CustomStatusBar";
import CustomText from "../Components/CustomText";
import CustomImage from "../Components/CustomImage";
import { windowHeight, windowWidth } from "../Utillity/utils";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import ScreenBoiler from "../Components/ScreenBoiler";
import CustomModal from "../Components/CustomModal";
import LinearGradient from "react-native-linear-gradient";

const SplashScreen = () => {

  const [visible , setVisible]=useState(false);
  const [firstSection , setFirstSection] = useState(true);
  const [loading , setIsLoading]=useState(1)
  console.log("🚀 ~ file: SplashScreen.js:19 ~ SplashScreen ~ loading", loading)

  const Splash1 = require("../Assets/Images/AccesoriesBig.png");
  const Splash2 = require("../Assets/Images/AccesoriesRight.png");
  const Splash3 = require("../Assets/Images/AccesoriesSmall.png");

 const increament = useCallback(
   () => {
    setTimeout(() => {
      setIsLoading(x=>x+2)
    }, 50)
   
   },
   [loading],
 )
  
 
  useEffect(() => {
   firstSection == false && loading <100 &&(
    increament()
   )
    
  }, [firstSection , loading])
  

  return (
    <ScreenBoiler
     
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={"dark-content"}
    >
     <View style={styles.container}>
     
        <Animatable.View
          animation="fadeInLeftBig"
          duration={2500}
          useNativeDriver
          style={[styles?.textContainer]}
          onAnimationEnd={() => {
           
          }}
          
        >
          <CustomImage
            source={Splash1}
            resizeMode={"contain"}
            style={[styles.bottomImage]}
          />
        </Animatable.View>
        <Animatable.View
          animation="fadeInRightBig"
          duration={2500}
          useNativeDriver
          style={[styles?.textContainer1]}
          onAnimationEnd={() => {
         
          }}
          
        >
          <CustomImage
            source={Splash2}
            resizeMode={"contain"}
            style={[styles.bottomImage1]}
          />
        </Animatable.View>
        <Animatable.View
          animation="fadeInLeftBig"
          duration={2500}
          useNativeDriver
          style={[styles?.textContainer2]}
          onAnimationEnd={() => {
            setVisible(true)
          }}
          
        >
          <CustomImage
            source={Splash3}
            resizeMode={"contain"}
            style={[styles.bottomImage2]}
          />
        </Animatable.View>
      </View>
      {visible == true &&
      <CustomModal
      isModalVisible={visible}
      hasBackdrop={false}

      >
        {
          firstSection ?
          <View style={{
            // width : windowWidth,
            height : windowHeight * 0.1,
              // backgroundColor : 'red'
          }}>

          <Animatable.Text 
          animation={'fadeInDown'}
          onAnimationEnd={()=>{
            setTimeout(() => {
              setFirstSection(false)
            }, 2000);
          
          }}
          duration={3000}
          style={styles.Heading}>
          FINANCE
        </Animatable.Text>

            </View>
          :
          <Animatable.View
          animation="fadeIn"
          duration={2500}
          useNativeDriver
          style={{
            width : windowWidth * 0.6 , 
            alignSelf : 'center',
            // backgroundColor : 'red',
          
          }}
          onAnimationEnd={() => {
            setVisible(true)
          }}
          
        >
          <Text style={styles.Heading}>
            FINANCE
          </Text>
          <Text style={styles.subHeading}>
            Hi, Welcome !!
          </Text>
          <Text style={styles.text}>
          Exceeding Your Expectations Every day .
          </Text>
         <View style={styles.emptyBar}>
          <LinearGradient
          colors={[ '#F84569','#003ED4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            height : '100%',
            width : `${loading}%` ,
            borderTopRightRadius : moderateScale(10,0.3),
            borderBottomRightRadius : moderateScale(10,0.3)
          }}
          ></LinearGradient>
         
         </View>
          
        </Animatable.View>

        }
        

      </CustomModal>
}
    </ScreenBoiler>
  );
  
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    height: windowHeight,
    width: windowWidth,
    backgroundColor : Color.white
  },
  bottomImage: {
    
    width : windowWidth * 0.5

  },
  subHeading : {
    fontSize : moderateScale(14,0.3),
    color: '#4D4D4D',
    alignSelf : 'center',
    fontWeight : '700',
    textAlign : 'center',
  },
  bottomImage1: {
    
    width : windowWidth*0.25

  },
  bottomImage2: {
    
    width : windowWidth*0.19

  },
  
  textContainer: {
    marginTop : moderateScale(20,0.3)
  
  },
  textContainer2: {
    height : windowHeight * 0.3,
    marginTop : moderateScale(50,0.3),
    justifyContent : 'center',
    // backgroundColor : 'red'
  
  },
  textContainer1: {
    marginTop : moderateScale(-70,0.3),
    alignSelf : 'flex-end',
    // backgroundColor : 'green'
  },
  Heading :{
    fontSize : moderateScale(36,0.3),
    fontWeight : 'bold',
    color :'#1B5CFB',
    textAlign : 'center',
    // fontFamily : 'serif',
  },
  text : {
    fontSize : moderateScale(14,0.3),
    color : '#999999',
    textAlign : 'center',
    lineHeight : moderateScale(20,0.3),marginTop : moderateScale(10,0.3)
  },
  emptyBar : {
    width : windowWidth * 0.6 ,
    marginTop : moderateScale(20,0.3),
    height : windowHeight * 0.014,
    borderRadius : moderateScale(10,0.3),
    backgroundColor : '#999999', 
      marginBottom : moderateScale(10,0.3),
      overflow : 'hidden'
  },
 
});

export default SplashScreen;
