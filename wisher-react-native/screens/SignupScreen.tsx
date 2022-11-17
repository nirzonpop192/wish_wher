import React, { useCallback, useRef, useState } from "react"
import { Keyboard, Linking, Pressable, StatusBar, TextInput, TextStyle, View } from "react-native"
import { ScrollView, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useDispatch } from "react-redux"
import images from "../assets/images"
import AppLoader from "../components/AppLoader"
import AuthFooter from "../components/AuthFooter"
import BoldText from "../components/BoldText"
import HeaderLogo from "../components/HeaderLogo"
import LargeRoundedButton from "../components/LargeRoundedButton"
import RegularText from "../components/RegularText"
import Root from "../components/Root"
import RootComponent from "../components/RootComponent"
import RoundedImageInput from "../components/RoundedImageInput"
import RoundedPasswordInput from "../components/RoundedPasswordInput"
import TimeZonePicker from "../components/TimezonPicker"
import TopRoundedCard from "../components/TopRoundedCard"
import appContants from "../constants/appContants"
import colors from "../constants/colors"
import useAuth from "../hooks/useAuth"
import useNotification from "../hooks/useNotification"
import { signup } from "../store/actions/authActions"
import { isIos } from "../utils/MiscUtils"
import { validateEmail } from "../utils/StringUtils"
import { ErrorToast, SomethingWentWrongToast, SuccessToast } from "../utils/ToastUtils"
import * as RNLocalize from "react-native-localize";
const ROOT: ViewStyle = {
  // backgroundColor: colors.white,
  backgroundColor: colors.globalBg,
  flex: 1,
  minHeight: "100%",
}

const LOGIN_TEXT: TextStyle = {
  fontSize: 30,
  color: colors.primary
}

const INPUT_CONTAINER: ViewStyle = {
  flex: 1,
  marginTop: 10,
  overflow: 'hidden',
}

const BUTTONS_CONTAINER: ViewStyle = {
  flex: 1,
  marginTop: 10,
  overflow: 'hidden',
}

const LOGIN_BUTTON_STYLE: ViewStyle = {
  marginTop: 30
}

const NAME = "NAME"
const EMAIL = "EMAIL"
const PASSWORD = "PASSWORD"
const CONF_PASSWORD = "CONF_PASSWORD"
const PHONE_NUMBER = "PHONE_NUMBER"

type SignupScreenProps = {
  navigation: any
  route: any
}

function SignupScreen(props: SignupScreenProps) {
  const { navigation } = props

  const dispatch = useDispatch()
  const safeArea = useSafeAreaInsets()
  const { token } = useNotification()


  const nameRef = useRef<TextInput | any>()
  const emailRef = useRef<TextInput | any>()
  const passwordRef = useRef<TextInput | any>()
  const confPasswordRef = useRef<TextInput | any>()
  const phoneNumberRef = useRef<TextInput | any>()
  const timezonePickerRef = useRef<any>()

  // const [name, setName] = useState('husnain')
  // const [email, setEmail] = useState('husnain@mailinator.com')
  // const [password, setPassword] = useState('11111111')
  // const [confPassword, setConfPassword] = useState('11111111')
  // const [waNumber, setWANumber] = useState('11111')
  // const [timezone, setTimezone] = useState('Asia/Karachi' || '')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [waNumber, setWANumber] = useState('')
  const [timezone, setTimezone] = useState(RNLocalize.getTimeZone())

  const [isLoading, setIsLoading] = useState(false)

  const onSubmitTextHandler = useCallback((textInputId) => {
    switch (textInputId) {
      case NAME:
        emailRef.current?.focus()
        break
      case EMAIL:
        phoneNumberRef.current?.focus()
        break
      case PHONE_NUMBER:
        passwordRef.current?.focus()
        break
      case PASSWORD:
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
      case NAME:
        setName(enteredText)
        break
      case EMAIL:
        setEmail(enteredText)
        break
      case PHONE_NUMBER:
        setWANumber(enteredText)
        break
      case PASSWORD:
        setPassword(enteredText)
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
      if (!name || !name.trim()) {
        ErrorToast("Please enter your name.")
        return false
      }
      if (!email || !email.trim()) {
        ErrorToast("Please enter your email.")
        return false
      }
      if (!validateEmail(email.trim())) {
        ErrorToast("Please enter a valid email-address.")
        return false
      }
      if (!waNumber || !waNumber.trim()) {
        ErrorToast("Please enter your phone number.")
        return false
      }
      if (isNaN(+waNumber.trim())) {
        ErrorToast("Please enter valid phone number.")
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
      if (!confPassword || !confPassword.trim()) {
        ErrorToast("Please enter password again.")
        return false
      }
      if (confPassword.trim().length < 6) {
        ErrorToast('Confirm Password length should be minimum of 6 characters.')
        return false
      }
      if (password.trim() !== confPassword.trim()) {
        ErrorToast("Password and confirm password doesn't match.")
        return false
      }
      return true
    } catch (err: any) {
      console.log('[checkValidation] Error : ', err.message)
      return false
    }
  }, [waNumber, confPassword, email, name, password])

  const signUpPressHandler = useCallback(async () => {
    try {
      if (checkValidation()) {
        setIsLoading(true)
        await dispatch(signup({
          email,
          fullname: name,
          password,
          phone: waNumber,
          token,
          timezone: timezone
        }))
        setIsLoading(false)
      }
    } catch (err: any) {
      setIsLoading(false)
      ErrorToast(err?.message || appContants.SOMETHING_WENT_WRONG)
      console.log('[signUpPressHandler] Error : ', err.message)
    }
  }, [checkValidation, timezone, email, name, waNumber, navigation, password])

  const privacyPolicyClickHandler = useCallback(async () => {
    try {
      const canOpen = await Linking.canOpenURL(appContants.ppolicyUrl)
      if (canOpen) {
        await Linking.openURL(appContants.ppolicyUrl)
      }
    } catch (err: any) {
      ErrorToast(`Can't Open`)
      console.log("[privacyPolicyClickHandler] Error : ", err.message)
    }
  }, [])

  const loginPressHandler = useCallback(() => {
    try {
      navigation.goBack()
    } catch (err: any) {
      console.log("[loginPressHandler] Error : ", err.message)
    }
  }, [navigation])

  const onTimezoneSelectHandler = useCallback(async (selectedTimezone: string) => {
    console.log("nir_timezone" + RNLocalize.getTimeZone())
    console.log("selectedTimezone" + selectedTimezone)
    try {
      timezonePickerRef?.current?.toggleVisibility()
      setTimezone(selectedTimezone)
    } catch (err: any) {
      console.log('[onTimezoneSelectHandler] Error : ', err.message)
    }
  }, [])



  const onTimezoneChooseHandler = useCallback(() => {
    console.log("nir_timezone" + RNLocalize.getTimeZone())
    try {
      timezonePickerRef?.current?.toggleVisibility()
    } catch (err: any) {
      SomethingWentWrongToast()
    }
  }, [])

  const onAutoTimezoneChooseHandler = useCallback(() => {
    console.log("nir_timezone" + RNLocalize.getTimeZone())
    try {
      setTimezone(RNLocalize.getTimeZone())
    } catch (err: any) {
      SomethingWentWrongToast()
    }
  }, [])


  return (
    <RootComponent style={ROOT}>
      <AppLoader isVisible={isLoading} />
      <TimeZonePicker
        ref={timezonePickerRef}
        onSelect={onTimezoneSelectHandler}
      />
      <ScrollView
        contentContainerStyle={{ minHeight: '100%', backgroundColor: "pink" }}
        style={{ flex: 1 }}
        alwaysBounceVertical={false}
      >
        <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
        <View style={{ ...ROOT, marginBottom: !isIos ? 0 : safeArea.bottom }}>
          <HeaderLogo
            logo={images.ic_app_logo}
          />
          <TopRoundedCard style={{ flex: 1 }}>
            <RegularText style={LOGIN_TEXT}>
              {"Signup"}
            </RegularText>
            <RegularText>
              {"Create account to continue!"}
            </RegularText>
            <View style={INPUT_CONTAINER}>
              <RoundedImageInput
                ref={nameRef}
                logo={images.ic_username}
                value={name}
                onChangeText={onTextChangeHandler.bind(null, NAME)}
                autoCapitalize="none"
                keyboardType="default"
                placeholder={"Name"}
                maxLength={20}
                onSubmitEditing={onSubmitTextHandler.bind(null, NAME)}
              />
              <RoundedImageInput
                ref={emailRef}
                logo={images.ic_email}
                value={email}
                onChangeText={onTextChangeHandler.bind(null, EMAIL)}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder={"Email"}
                onSubmitEditing={onSubmitTextHandler.bind(null, EMAIL)}
              />
              <RoundedImageInput
                ref={emailRef}
                logo={images.ic_whatsapp}
                value={waNumber}
                onChangeText={onTextChangeHandler.bind(null, PHONE_NUMBER)}
                autoCapitalize="none"
                keyboardType="number-pad"
                placeholder={"Phone Number"}
                onSubmitEditing={onSubmitTextHandler.bind(null, PHONE_NUMBER)}
              />

              <Pressable
                onPress={onTimezoneChooseHandler}>
                <RoundedImageInput
                  // ref={null}
                  logo={images.ic_clock}
                  value={timezone || 'Your Timezone'}
                  autoCapitalize="none"
                  placeholder={"Your Timezone"}
                  editable={false}
                />
              </Pressable>






              <RoundedPasswordInput
                ref={passwordRef}
                logo={images.ic_password}
                value={password}
                onChangeText={onTextChangeHandler.bind(null, PASSWORD)}
                placeholder={"Password"}
                autoCapitalize="none"
                keyboardType="default"
                onSubmitEditing={onSubmitTextHandler.bind(null, PASSWORD)}
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
            <View style={BUTTONS_CONTAINER}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}>
                <RegularText
                  onPress={privacyPolicyClickHandler}
                  style={{ fontSize: 10 }}
                >
                  {"By registering, you agree to our "}
                  <BoldText
                    style={{ fontSize: 10, color: colors.primary, textDecorationColor: colors.primary }}
                  >
                    {"Privacy Policy"}
                  </BoldText>
                </RegularText>
              </View>
              <LargeRoundedButton
                style={LOGIN_BUTTON_STYLE}
                title={"JOIN NOW!"}
                onPress={signUpPressHandler}
              />
            </View>
            <AuthFooter
              text={"Have an account?"}
              buttonText={"Login Here"}
              onPress={loginPressHandler}
              style={{ marginTop: 20 }}
            />
          </TopRoundedCard>
        </View>
      </ScrollView>
    </RootComponent>
  )
}

export default SignupScreen;
