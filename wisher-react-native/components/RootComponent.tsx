/* eslint-disable react/no-string-refs */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { View, TouchableWithoutFeedback, Dimensions, ViewStyle, Keyboard, ScrollView } from "react-native"
import SafeAreaView from 'react-native-safe-area-view'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import colors from "../constants/colors"

export interface RootProps {
  style?: ViewStyle
  children: React.ReactNode | React.ReactNode[]
}

function RootComponent(props: RootProps) {
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
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        collapsable={false}
        contentContainerStyle={{
          flexGrow: 1 // this will fix scrollview scroll issue by passing parent view width and height to it
        }}
        {...otherProps}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flexGrow: 1 }}
        >
          <View
            collapsable={false}
            style={{
              flexGrow: 1,
              height: '100%',
              ...style
            }}
          >
            {children}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default RootComponent;
