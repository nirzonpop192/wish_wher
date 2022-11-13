import * as React from "react"
import { TextStyle, ViewStyle } from "react-native"
import colors from "../constants/colors"
import BoldText from "./BoldText"
import RegularText from "./RegularText"

export interface AuthFooterProps {
  style?: ViewStyle
  textStyle?: TextStyle
  text: string
  onPress: () => void
  buttonText: string
}

const AuthFooter = (props: AuthFooterProps) => {
  const { style, textStyle, text, buttonText, onPress } = props

  return (
    <RegularText
      numberOfLines={2}
      onPress={onPress}
      style={{ fontSize: 14, marginVertical: 20, alignSelf: 'center', textAlign: 'center' }}
    >
      {text + " "}
      <BoldText
        style={{
          fontSize: 14, color: colors.black,
          textDecorationColor: colors.black,
          textDecorationLine: 'underline'
        }}
      >
        {buttonText}
      </BoldText>
    </RegularText>
  )
}

export default AuthFooter
