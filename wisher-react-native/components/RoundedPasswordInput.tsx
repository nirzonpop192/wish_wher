import * as React from "react"
import { TextStyle, View, Image, TextInput, ViewStyle, ImageStyle, TextInputProps, ImageSourcePropType, Pressable } from "react-native"
import images from "../assets/images"
import colors from "../constants/colors"

const visibleEye = images.ic_visible_eye
const invisibleEye = images.ic_invisible_eye

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

const PASSWORD_EYE_LOGO_STYLE: ImageStyle = {
  height: 22, width: 22, marginRight: 10
}

const TEXT: TextStyle = {
  flex: 1,
  color: colors.black,
  fontSize: 16,
//   fontFamily: '',
  paddingRight: 40,
}

export interface RoundedPasswordInputProps {
    style?: ViewStyle,
    logoStyle?: ImageStyle,
    textStyle?: TextStyle,
    logo: ImageSourcePropType,
}

const RoundedPasswordInput = React.forwardRef(function RoundedPasswordInput(props: RoundedPasswordInputProps & TextInputProps, ref: any) {
  const { style, logoStyle, textStyle } = props

  const [showPassword, setShowPassword] = React.useState(false)

  const eyePressHandler = React.useCallback(() => {
    setShowPassword(prevState => !prevState)
  }, [])

  return (
    <View style={[CONTAINER, style]}>
      <Image
        source={props.logo}
        style={[INPUT_LOGO_STYLE, logoStyle]}
      />
      <TextInput
        ref={ref}
        placeholderTextColor={colors.black}
        autoCorrect={false}
        onSubmitEditing={props.onSubmitEditing}
        blurOnSubmit={false}
        returnKeyType="next"
        {...props}
        style={[TEXT, textStyle, { fontSize: 14 }]}
        maxLength={15}
        secureTextEntry={!showPassword}
        numberOfLines={1}
      />
      <Pressable onPress={eyePressHandler}>
        <Image
          source={!showPassword ? visibleEye : invisibleEye}
          style={[PASSWORD_EYE_LOGO_STYLE, logoStyle]}
        />
      </Pressable>
    </View>
  )
})

export default RoundedPasswordInput;
