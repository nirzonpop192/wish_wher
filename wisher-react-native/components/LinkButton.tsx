import * as React from "react"
import { TextStyle, Pressable, ViewStyle } from "react-native"
import colors from "../constants/colors"
import BoldText from "./BoldText"

const CONTAINER: ViewStyle = {
  alignSelf: 'flex-end',
}

const TEXT: TextStyle = {
  textDecorationLine: 'underline',
  textDecorationColor: colors.black,
  fontSize: 16
}

export interface LinkButtonProps {
  style?: ViewStyle
  titleStyle?: TextStyle
  title: string,
  onPress: () => void
  disabled?: boolean
}

const LinkButton = function LinkButton(props: LinkButtonProps) {
  const { style, titleStyle } = props

  return (
    <Pressable disabled={props.disabled} onPress={props.onPress} style={[CONTAINER, style]}>
      <BoldText style={{ ...TEXT, ...titleStyle }}>{props.title}</BoldText>
    </Pressable>
  )
}

LinkButton.defaultProps = {
  disabled: false
}

export default LinkButton
