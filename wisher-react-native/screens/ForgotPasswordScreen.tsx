import React, { useCallback, useEffect, useRef, useState } from "react"
import { Keyboard, ScrollView, StatusBar, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import Root from "../components/Root"
import AppLoader from "../components/AppLoader"
import HeaderLogo from "../components/HeaderLogo"
import TopRoundedCard from "../components/TopRoundedCard"
import RegularText from "../components/RegularText"
import RoundedImageInput from "../components/RoundedImageInput"
import RoundedPasswordInput from "../components/RoundedPasswordInput"
import LinkButton from "../components/LinkButton"
import LargeRoundedButton from "../components/LargeRoundedButton"
import AuthFooter from "../components/AuthFooter"

import { isIos } from "../utils/MiscUtils"
import { ErrorToast, SuccessToast } from "../utils/ToastUtils"
import { validateEmail } from "../utils/StringUtils"
import appContants from "../constants/appContants"
import colors from "../constants/colors"
import images from "../assets/images"
import useAuth from "../hooks/useAuth"
import RootComponent from "../components/RootComponent"
import { useDispatch } from "react-redux"
import { forgotPassword } from "../store/actions/authActions"

const ROOT: ViewStyle = {
  backgroundColor: colors.primary,
  flex: 1,
}

const SCROLLVIEW_CONTAINER_STYLE: ViewStyle = {
  minHeight: "100%"
}

const LOGIN_TEXT: TextStyle = {
  fontSize: 30,
  color: colors.primary
}

const INPUT_CONTAINER: ViewStyle = {
  marginTop: 10,
  overflow: 'hidden',
}

const BUTTONS_CONTAINER: ViewStyle = {
  flex: 1,
  marginVertical: 10
}

const LOGIN_BUTTON_STYLE: ViewStyle = {
  marginTop: 30
}

const BACK_BUTTON_STYLE: ViewStyle = {
    marginTop: 15
}

type ForgotPasswordScreenProps = {
  navigation: any
  route: any
}

const EMAIL = "EMAIL"
const PASSWORD = "PASSWORD"

function ForgotPasswordScreen(props: ForgotPasswordScreenProps) {
  const { navigation } = props
  const safeArea = useSafeAreaInsets()

  const dispatch = useDispatch()

  const emailRef = useRef<TextInput | any>()
  const mounted = useRef<boolean>(false)

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  const checkValidation = useCallback(() => {
    try {
      if (!email || !email.trim()) {
        ErrorToast("Please enter your email.")
        return false
      }
      if (!validateEmail(email.trim())) {
        ErrorToast("Please enter a valid email-address.")
        return false
      }
      return true
    } catch (err: any) {
      console.log('[checkValidation] Error : ', err.message)
      return false
    }
  }, [email])

  const actionHandler = useCallback(async (action: string) => {
    try {
      if (action === "back") {
        navigation.goBack()
      } else {
        if (checkValidation()) {
          setIsLoading(true)
          const resetPasswordRes = await forgotPassword(email)
          if (resetPasswordRes.data.status) {
            SuccessToast(resetPasswordRes.data.message)
            navigation.goBack()
          } else {
            ErrorToast(appContants.SOMETHING_WENT_WRONG)
          }
          mounted.current && setIsLoading(false)
        }
      }
    } catch (err: any) {
      setIsLoading(false)
      ErrorToast(err?.message || appContants.SOMETHING_WENT_WRONG)
      console.log('[loginPressHandler] Error : ', err.message)
    }
  }, [navigation, checkValidation, email])

  const onTextChangeHandler = useCallback((textInputId, enteredText) => {
    switch (textInputId) {
      case EMAIL:
        setEmail(enteredText)
        break
      default:
        break
    }
  }, [])
  
  return (
    <RootComponent style={ROOT}>
      {/* <AppLoader isVisible={isLoading} /> */}
      <ScrollView contentContainerStyle={SCROLLVIEW_CONTAINER_STYLE} alwaysBounceVertical={false}>
          <StatusBar barStyle={"light-content"} backgroundColor={colors.black} />
          <AppLoader isVisible={isLoading} />
          <View style={{ ...ROOT, marginBottom: isIos ? 0 : safeArea.bottom }}>
            <HeaderLogo
              logo={images.ic_login_logo}
            />
            <TopRoundedCard>
              <RegularText style={LOGIN_TEXT}>
                {"Forgot Password"}
              </RegularText>
              <RegularText style={{ color: colors.black }}>
                {"Enter credentials to recover your account!"}
              </RegularText>
              <View style={INPUT_CONTAINER}>
                <RoundedImageInput
                  ref={emailRef}
                  logo={images.ic_email}
                  value={email}
                  onChangeText={onTextChangeHandler.bind(null, EMAIL)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder={"Email"}
                  returnKeyType="done"
                  blurOnSubmit={true}
                  // onSubmitEditing={onSubmitTextHandler.bind(null, EMAIL)}
                />
              </View>
              <View style={BUTTONS_CONTAINER}>
                <LargeRoundedButton
                  style={LOGIN_BUTTON_STYLE}
                  title={"SUBMIT"}
                  onPress={actionHandler.bind(null, "submit")}
                />
                <LargeRoundedButton
                  style={BACK_BUTTON_STYLE}
                  title={"BACK"}
                  onPress={actionHandler.bind(null, "back")}
                />
              </View>
            </TopRoundedCard>
          </View>
      </ScrollView>
    </RootComponent>
  )
}

export default ForgotPasswordScreen