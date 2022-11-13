import * as React from "react"
import { Text } from "react-native"
import { TextProps, TextStyle } from "react-native"
import colors from "../constants/colors"

const TEXT: TextStyle = {
  // fontFamily: '',
  fontSize: 14,
  color: colors.black,
}

export interface RegularTextProps {
  style?: TextStyle
  children: React.ReactChild | React.ReactChild[]
}

export const RegularText = function RegularText(props: RegularTextProps & TextProps) {
  const { style } = props
  return (
    <Text {...props} style={[TEXT, style]}>{props.children}</Text>
  )
}

export default RegularText
