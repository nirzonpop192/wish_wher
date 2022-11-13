import * as React from "react"
import { TextStyle, View, Image, ViewStyle, ImageStyle, ImageSourcePropType, TextProps, Pressable } from "react-native"
import colors from "../constants/colors"
import RegularText from "./RegularText"

const CONTAINER: ViewStyle = {
  height: 50,
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 2,
  borderColor: colors.black,
  borderRadius: 30,
  paddingHorizontal: 5,
  marginTop: 20,
}

const INPUT_LOGO_STYLE: ImageStyle = {
  height: 40,
  width: 40,
  marginRight: 5
}

const TEXT: TextStyle = {
  flex: 1,
  color: colors.black,
  fontSize: 14,
}

export interface RoundedImageInputButtonProps {
  style?: ViewStyle,
  logoStyle?: ImageStyle,
  textStyle?: TextStyle,
  logo: ImageSourcePropType,
  text: string,
  disabled?: boolean
  onPress?: () => void
}

const RoundedImageInputButton = React.forwardRef(function RoundedImageInputButton(props: RoundedImageInputButtonProps & TextProps, ref: any) {
  const {
    style,
    disabled,
    logoStyle,
    textStyle,
    logo,
    text,
    onPress
  } = props

  return (
    <Pressable disabled={disabled} onPress={onPress} style={[CONTAINER, style]}>
      <Image
        source={logo}
        style={[INPUT_LOGO_STYLE, logoStyle]}
        resizeMode="contain"
      />
      <RegularText
        style={{
          ...TEXT,
          ...textStyle
        }}
      >
        {text}
      </RegularText>
    </Pressable>
  )
})

RoundedImageInputButton.defaultProps = {
  disabled: false,
}

export default RoundedImageInputButton
