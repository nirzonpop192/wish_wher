import * as React from "react"
import { View, ViewStyle } from "react-native"
import colors from "../constants/colors"

const CONTAINER: ViewStyle = {
  flex: 1,
  // backgroundColor: colors.white,
  backgroundColor: colors.globalBg,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  paddingTop: 20,
  paddingHorizontal: 40,
}

export interface TopRoundedCardProps {
  style?: ViewStyle
  children: React.ReactNode | React.ReactNode[]
}

const TopRoundedCard = function TopRoundedCard(props: TopRoundedCardProps) {
  const { style } = props

  return (
    <View style={[CONTAINER, style]}>
      {props.children}
    </View>
  )
}

export default TopRoundedCard

