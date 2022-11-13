/* eslint-disable react/no-string-refs */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { View, TouchableWithoutFeedback, Dimensions, ViewStyle, Keyboard, ScrollView } from "react-native"
import SafeAreaView from 'react-native-safe-area-view'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import colors from "../constants/colors"

export interface RootProps {
  style?: ViewStyle,
  unsafe?: boolean
  children: React.ReactNode | React.ReactNode[]
}

function Root(props: RootProps) {
  const { style, children, unsafe, ...otherProps } = props

  if (unsafe) {
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        collapsable={false}
        contentContainerStyle={{
          flexGrow: 1, // this will fix scrollview scroll issue by passing parent view width and height to it
          // backgroundColor: colors.white

          backgroundColor: colors.globalBg,
        }}
        style={{
          backgroundColor: colors.globalBg
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
              backgroundColor: colors.globalBg,
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
      </KeyboardAwareScrollView>
    )
  }

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
        style={{
          backgroundColor: colors.globalBg
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Root;

