import React, { useCallback, useEffect, useRef, useState } from "react"
import { Keyboard, ScrollView, StatusBar, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import messaging from '@react-native-firebase/messaging';

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
import useNotification, { getToken } from "../hooks/useNotification"
import RootComponent from "../components/RootComponent"
import { useDispatch } from "react-redux"
import { login, LoginRequest } from "../store/actions/authActions"



import '../NotificationConfig'

const ROOT: ViewStyle = {
  // backgroundColor: colors.white,
  backgroundColor: colors.globalBg,

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

type LoginScreenProps = {
  navigation: any
  route: any
}

const EMAIL = "EMAIL"
const PASSWORD = "PASSWORD"

function LoginScreen(props: LoginScreenProps) {
  const { navigation } = props
  const safeArea = useSafeAreaInsets()
  const dispatch = useDispatch()

  const { token } = useNotification()

  const emailRef = useRef<TextInput | any>()
  const passwordRef = useRef<TextInput | any>()
  const mounted = useRef<boolean>(false)


  // const emailRef = useRef<TextInput | any>('husnain@mailinator.com')
  // const passwordRef = useRef<TextInput | any>('11111111')

  // const [email, setEmail] = useState('husnain@mailinator.com')
  // const [password, setPassword] = useState('11111111');

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const [pushToken, setPushToken] = useState<string>("");


  useEffect(() => {
    getFcmToken()
  }, [])


  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken()
    if (fcmToken) {
      setPushToken(fcmToken);
    }
    getFcmToken();
  }

  const onSubmitTextHandler = useCallback((textInputId: any) => {
    switch (textInputId) {
      case EMAIL:
        passwordRef.current.focus()
        break
      case PASSWORD:
        Keyboard.dismiss()
        break
      default:
        break
    }
  }, [])

  const onTextChangeHandler = useCallback((textInputId, enteredText) => {
    switch (textInputId) {
      case EMAIL:
        setEmail(enteredText)
        break
      case PASSWORD:
        setPassword(enteredText)
        break
      default:
        break
    }
  }, [])

  const checkValidation = useCallback(() => {
    try {
      if (!email || !email.trim()) {
        ErrorToast("Please enter your email.")
        return false
      }
      if (!password || !password.trim()) {
        ErrorToast("Please enter your password.")
        return false
      }
      if (password.trim().length < 6) {
        ErrorToast('Password length should be minimum of 6 characters.')
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
  }, [email, password])

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  const loginPressHandler = useCallback(async () => {

    const token = pushToken;

    try {
      if (checkValidation()) {
        setIsLoading(true)
        const loginReq: LoginRequest = {
          email: email.trim(),
          password: password.trim(),
          token
        }
        await dispatch(login(loginReq))
        mounted.current && setIsLoading(false)
      }
    } catch (err: any) {
      setIsLoading(false)
      ErrorToast(err?.message || appContants.SOMETHING_WENT_WRONG)
    }
  }, [navigation, checkValidation, email, password])

  const forgotPasswordHandler = useCallback(() => {
    try {
      navigation.navigate('forgotPassword')
    } catch (err: any) {
      console.log("[forgotPasswordHandler] Error : ", err.message)
    }
  }, [navigation])

  const signUpPressHandler = useCallback(() => {
    try {
      navigation.navigate('signup')
    } catch (err: any) {
      console.log("[signUpPressHandler] Error : ", err.message)
    }
  }, [navigation])

  return (
    <RootComponent style={ROOT}>
      {/* <AppLoader isVisible={isLoading} /> */}
      <ScrollView contentContainerStyle={SCROLLVIEW_CONTAINER_STYLE} alwaysBounceVertical={false}>
        <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
        <AppLoader isVisible={isLoading} />
        <View style={{ ...ROOT, marginBottom: isIos ? 0 : safeArea.bottom }}>
          <HeaderLogo
            logo={images.ic_app_logo}
          />
          <TopRoundedCard>
            <RegularText style={LOGIN_TEXT}>
              {"Login"}
            </RegularText>
            <RegularText style={{ color: colors.black }}>
              {"Enter credentials to access your account!"}
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
                blurOnSubmit={false}
                onSubmitEditing={onSubmitTextHandler.bind(null, EMAIL)}
              />
              <RoundedPasswordInput
                ref={passwordRef}
                logo={images.ic_password}
                value={password}
                onChangeText={onTextChangeHandler.bind(null, PASSWORD)}
                placeholder={"Password"}
                autoCapitalize="none"
                keyboardType="default"
                onSubmitEditing={onSubmitTextHandler.bind(null, PASSWORD)}
                blurOnSubmit={true}
                returnKeyType="done"
              />
            </View>
            <View style={BUTTONS_CONTAINER}>
              <LinkButton
                title={"Forgot Password?"}
                onPress={forgotPasswordHandler}
              />
              <LargeRoundedButton
                style={LOGIN_BUTTON_STYLE}
                title={"LOGIN"}
                onPress={loginPressHandler}
              />
            </View>
            <AuthFooter
              text={"Don't have an account?"}
              buttonText={"Signup Here"}
              onPress={signUpPressHandler}
            />
          </TopRoundedCard>
        </View>
      </ScrollView>
    </RootComponent>
  )
}

export default LoginScreen