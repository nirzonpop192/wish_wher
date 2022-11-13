import * as React from "react"
import { ActivityIndicator, View, ViewStyle } from "react-native"
import Modal from 'react-native-modal'
import colors from "../constants/colors"

const ROOT: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center'
}

const CONTAINER: ViewStyle = {
  height: 100,
  width: 100,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  // backgroundColor: colors.white
  backgroundColor: colors.globalBg,
}

export interface AppLoaderProps {
   isVisible: boolean
}

function AppLoader(props: AppLoaderProps) {
  const { isVisible } = props

  if (!isVisible) {
    return null
  }

  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver={true}
      style={ROOT}
    >
      <View style={CONTAINER}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </Modal>
  )
}

export default AppLoader;

