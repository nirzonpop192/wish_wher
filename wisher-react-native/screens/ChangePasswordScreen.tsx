import React, { useCallback, useLayoutEffect, useRef, useState } from "react"
import { Keyboard, StatusBar, TextInput, TextStyle, View } from "react-native"
import { ScrollView, ViewStyle } from "react-native"
import { useSelector } from "react-redux"
import images from "../assets/images"
import AppLoader from "../components/AppLoader"
import BoldText from "../components/BoldText"
import LargeRoundedButton from "../components/LargeRoundedButton"
import Root from "../components/Root"
import RoundedPasswordInput from "../components/RoundedPasswordInput"
import appContants from "../constants/appContants"
import colors from "../constants/colors"
import { changePassword } from "../store/actions/authActions"
import { User } from "../types"
import { ErrorToast, SuccessToast } from "../utils/ToastUtils"

const ROOT: ViewStyle = {
  flex: 1,
}

const INPUT_CONTAINER: ViewStyle = {
  marginTop: 5,
  overflow: 'hidden',
  paddingHorizontal: 15
}

const SAVE_BUTTON_STYLE: ViewStyle = {
  marginTop: 30,
  width: "50%",
  alignSelf: 'center'
}

const OLD_PASSWORD = "OLD_PASSWORD"
const NEW_PASSWORD = "NEW_PASSWORD"
const CONF_PASSWORD = "CONF_PASSWORD"

type ChangePasswordScreenProps = {
  navigation: any
  route: any
}

function ChangePasswordScreen(props: ChangePasswordScreenProps) {
    // Pull in navigation via hook
    const { navigation, route } = props

    const userData: User = useSelector((state: any) => state.auth)

    const oldPasswordRef = useRef<TextInput | any>()
    const newPasswordRef = useRef<TextInput | any>()
    const confPasswordRef = useRef<TextInput | any>()
    const mountedRef = useRef(false)

    const [isLoading, setIsLoading] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const onSubmitTextHandler = useCallback((textInputId) => {
      switch (textInputId) {
        case OLD_PASSWORD:
          newPasswordRef.current?.focus()
          break
        case NEW_PASSWORD:
          confPasswordRef.current?.focus()
          break
        case CONF_PASSWORD:
          Keyboard.dismiss()
          break
        default:
          break
      }
    }, [])
  
    const onTextChangeHandler = useCallback((textInputId, enteredText) => {
      switch (textInputId) {
        case OLD_PASSWORD:
          setOldPassword(enteredText)
          break
        case NEW_PASSWORD:
          setNewPassword(enteredText)
          break
        case CONF_PASSWORD:
          setConfPassword(enteredText)
          break
        default:
          break
      }
    }, [])
  
    const checkValidation = useCallback(() => {
      try {
        if (!oldPassword || !oldPassword.trim()) {
          ErrorToast('Please enter your old password.')
          return false
        }
        if (oldPassword.trim().length < 6) {
          ErrorToast('Old password length should be minimum of 6 characters.')
          return false
        }
        if (!newPassword || !newPassword.trim()) {
          ErrorToast('Please enter your new password.')
          return false
        }
        if (newPassword.trim().length < 6) {
          ErrorToast('New password length should be minimum of 6 characters.')
          return false
        }
        if (!confPassword || !confPassword.trim()) {
          ErrorToast('Please enter your confirm password.')
          return false
        }
        if (confPassword.trim().length < 6) {
          ErrorToast('Confirm password length should be minimum of 6 characters.')
          return false
        }
        if (newPassword.trim() !== confPassword.trim()) {
          ErrorToast(`New password and confirm new password doesn't match.`)
          return false
        }
        return true
      } catch (err: any) {
        console.log('[checkValidation] Error : ', err.message)
        return false
      }
    }, [oldPassword, newPassword, confPassword])
  
    const savePressHandler = useCallback(async () => {
      try {
        if (checkValidation()) {
          setIsLoading(true)
          const changePasswordRes = await changePassword(userData.u_id, oldPassword.trim(), newPassword.trim())
          setIsLoading(false)
          if (changePasswordRes.data.status) {
            SuccessToast("Password Updated Successfully")
            navigation.goBack()
          } else {
            ErrorToast(appContants.SOMETHING_WENT_WRONG)
          }
        }
      } catch (err: any) {
        setIsLoading(false)
        ErrorToast(err?.message || appContants.SOMETHING_WENT_WRONG)
        console.log('[savePressHandler] Error : ', err.message)
      }
    }, [checkValidation, navigation, oldPassword, newPassword])

  return (
    <Root unsafe  style={ROOT}>
      <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
      <AppLoader isVisible={isLoading} />
      <ScrollView
        contentContainerStyle={{
          minHeight: '100%',
        }}
        alwaysBounceVertical={false}
      >
        <View style={INPUT_CONTAINER}>
          <BoldText
            style={{
              marginTop: 20,
              marginLeft: 10,
              fontSize: 18,
              marginBottom: 10
            }}
          >
            {"Enter Details to update password"}
          </BoldText>
          <RoundedPasswordInput
            ref={oldPasswordRef}
            logo={images.ic_password}
            value={oldPassword}
            onChangeText={onTextChangeHandler.bind(null, OLD_PASSWORD)}
            placeholder={"Old Password"}
            autoCapitalize="none"
            keyboardType="default"
            onSubmitEditing={onSubmitTextHandler.bind(null, OLD_PASSWORD)}
            blurOnSubmit={true}
            returnKeyType="done"
          />
          <RoundedPasswordInput
            ref={newPasswordRef}
            logo={images.ic_password}
            value={newPassword}
            onChangeText={onTextChangeHandler.bind(null, NEW_PASSWORD)}
            placeholder={"New Password"}
            autoCapitalize="none"
            keyboardType="default"
            onSubmitEditing={onSubmitTextHandler.bind(null, NEW_PASSWORD)}
            blurOnSubmit={true}
            returnKeyType="done"
          />
          <RoundedPasswordInput
            ref={confPasswordRef}
            logo={images.ic_password}
            value={confPassword}
            onChangeText={onTextChangeHandler.bind(null, CONF_PASSWORD)}
            placeholder={"Confirm Password"}
            autoCapitalize="none"
            keyboardType="default"
            onSubmitEditing={onSubmitTextHandler.bind(null, CONF_PASSWORD)}
            blurOnSubmit={true}
            returnKeyType="done"
          />
        </View>
        <LargeRoundedButton
          style={SAVE_BUTTON_STYLE}
          title={"UPDATE"}
          onPress={savePressHandler}
        />
    </ScrollView>
    </Root>
  )
}

export default ChangePasswordScreen;
