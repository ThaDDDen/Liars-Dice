import { View, Text } from 'react-native'
import React from 'react'
import OnBoarding from '../components/onboarding/OnBoarding'
import { HomeNavProps } from './HomeScreen'

const OnBoardingScreen = ({navigation} : HomeNavProps) => {
  return (
    <OnBoarding navigate={()=> navigation.navigate("Register")}/>
  )
}

export default OnBoardingScreen