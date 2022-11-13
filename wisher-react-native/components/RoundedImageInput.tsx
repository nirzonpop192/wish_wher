
import * as React from "react"
import { TextStyle, View, Image, TextInput, ViewStyle, ImageStyle, TextInputProps, ImageSourcePropType } from "react-native"
import colors from "../constants/colors"

const CONTAINER: ViewStyle = {
  height: 50,
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 2,
  borderColor: colors.black,
  borderRadius: 30,
  paddingHorizontal: 5,
  marginTop: 20
}

const INPUT_LOGO_STYLE: ImageStyle = {
  height: 40, width: 40, marginRight: 5
}

const TEXT: TextStyle = {
  flex: 1,
  overflow: 'scroll',
  color: colors.black,
  fontSize: 16,
//   fontFamily: '',
}

export interface RoundedImageInputProps {
  style?: ViewStyle,
  logoStyle?: ImageStyle,
  textStyle?: TextStyle,
  logo: ImageSourcePropType,
}

const RoundedImageInput = React.forwardRef(function RoundedImageInput(props: RoundedImageInputProps & TextInputProps, ref: any) {
  const { style, logoStyle, textStyle } = props

  return (
    <View style={[CONTAINER, style]}>
      <Image
        source={props.logo}
        style={[INPUT_LOGO_STYLE, logoStyle]}
        resizeMode="cover"
      />
      <TextInput
        ref={ref}
        placeholderTextColor={colors.black}
        maxLength={50}
        autoCorrect={false}
        blurOnSubmit={false}
        returnKeyType="next"
        {...props}
        style={[TEXT, textStyle, { fontSize: 14 }]}
      />
    </View>
  )
})

export default RoundedImageInput
