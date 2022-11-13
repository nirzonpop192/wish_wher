import * as React from "react"
import { Image, Pressable, ImageStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import images from "../assets/images"
import colors from "../constants/colors"
import { isIos } from "../utils/MiscUtils"

const ADD_NEW_CARD_CONTAINER: ViewStyle = {
  position: 'absolute',
  bottom: 25,
  right: 20,
  padding: 18,
  borderRadius: 50,
  backgroundColor: colors.primary
}

const ADD_NEW_CARD_IMAGE_STYLE: ImageStyle = {
  height: 26,
  width: 26,
}

export interface FloatingActionButtonProps {
  style?: ViewStyle
  onPress: () => void
}

const FloatingActionButton = (props: FloatingActionButtonProps) => {
    const safeArea = useSafeAreaInsets()
  const { onPress } = props

  return (
    <Pressable
        onPress={onPress}
        style={{
            ...ADD_NEW_CARD_CONTAINER,
            bottom: isIos ? safeArea.bottom + 18 : 18
        }}
    >
      <Image
        source={images.ic_add}
        style={ADD_NEW_CARD_IMAGE_STYLE}
      />
    </Pressable>
  )
}

export default FloatingActionButton
