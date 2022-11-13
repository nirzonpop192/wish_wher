import * as React from "react"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import colors from "../constants/colors"
import BoldText from "./BoldText"

const CONTAINER: ViewStyle = {
  backgroundColor: colors.primary,
  height: 50,
  borderRadius: 30,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10
}

const TEXT: TextStyle = {
//   fontFamily: '',
  fontSize: 16,
  color: colors.white,
}

export interface LargeRoundedButtonProps {
  style?: ViewStyle
  textStyle?: TextStyle
  title: string,
  onPress: () => void
  disable?: boolean
}

const LargeRoundedButton = (props: LargeRoundedButtonProps) => {
  const { style, textStyle } = props
  return (
    <Pressable disabled={props.disable} onPress={props.onPress} style={[CONTAINER, style]}>
      <BoldText style={{ ...TEXT, ...textStyle }}>{props.title}</BoldText>
    </Pressable>
  )
}

LargeRoundedButton.defaultProps = {
  disable: false
}

export default LargeRoundedButton

