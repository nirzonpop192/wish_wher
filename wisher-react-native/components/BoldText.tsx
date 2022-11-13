import * as React from "react"
import { Text, TextProps, TextStyle } from "react-native"
import colors from "../constants/colors"

const TEXT: TextStyle = {
  // fontFamily: '',
  fontSize: 14,
  color: colors.black,
  fontWeight: "bold",
}

export interface BoldTextProps {
  style?: TextStyle
  children: React.ReactChild
}

export const BoldText = function BoldText(props: BoldTextProps & TextProps) {
  const { style, ...otherProps } = props
  return (
    <Text style={[TEXT, style]} {...otherProps}>{props.children}</Text>
  )
}

export default BoldText
