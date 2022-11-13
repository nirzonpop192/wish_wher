import * as React from "react"
import { View, Image, Dimensions, ViewStyle, ImageStyle, ImageSourcePropType } from "react-native"

const { height, width } = Dimensions.get('screen')

const CONTAINER: ViewStyle = {
    height: height * 0.30,
    width,
    alignItems: 'center',
    justifyContent: 'center'
}

const LOGO_STYLE: ImageStyle = { height: height * 0.3, width: width * 0.5,marginTop: 10 }

export interface HeaderLogoProps {
  style?: ViewStyle,
  logo: ImageSourcePropType
}

const HeaderLogo = function HeaderLogo(props: HeaderLogoProps) {
  return (
    <View style={CONTAINER}>
      <Image
        source={props.logo}
        style={LOGO_STYLE}
        resizeMode="contain"
      />
    </View>
  )
}

export default HeaderLogo;
