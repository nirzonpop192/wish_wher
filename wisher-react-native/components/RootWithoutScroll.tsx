/* eslint-disable react/no-string-refs */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { View, TouchableWithoutFeedback, Dimensions, ViewStyle, Keyboard, ScrollView } from "react-native"
import SafeAreaView from 'react-native-safe-area-view'
import colors from "../constants/colors"

export interface RootProps {
  style?: ViewStyle
  children: React.ReactNode | React.ReactNode[]
}

function RootWithoutScoll(props: RootProps) {
  const { style, children, ...otherProps } = props

  return (
    <SafeAreaView
      collapsable={false}
      style={{
        flex: 1,
        // backgroundColor: colors.white
        backgroundColor: colors.globalBg,
      }}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{ flexGrow: 1 }}
      >
        <View
          collapsable={false}
          style={{
            flexGrow: 1,
            backgroundColor: colors.secondry,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingVertical: 5,
            paddingHorizontal: 10,
            height: '100%',
            ...style
          }}
        >
          {children}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default RootWithoutScoll;

