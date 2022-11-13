import React, { useCallback, useLayoutEffect, useRef, useState } from "react"
import { Image, Keyboard, Pressable, StatusBar, TextInput, TextStyle, View } from "react-native"
import { ScrollView, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import images from "../assets/images"
import AppLoader from "../components/AppLoader"
import AuthFooter from "../components/AuthFooter"
import BoldText from "../components/BoldText"
import HeaderLogo from "../components/HeaderLogo"
import LargeRoundedButton from "../components/LargeRoundedButton"
import RegularText from "../components/RegularText"
import Root from "../components/Root"
import RoundedImageInput from "../components/RoundedImageInput"
import RoundedImageInputButton from "../components/RoundedImageInputButton"
import RoundedPasswordInput from "../components/RoundedPasswordInput"
import TopRoundedCard from "../components/TopRoundedCard"
import appContants from "../constants/appContants"
import colors from "../constants/colors"
import { delay, isIos } from "../utils/MiscUtils"
import { validateEmail } from "../utils/StringUtils"
import { ErrorToast, SomethingWentWrongToast, SuccessToast } from "../utils/ToastUtils"
import ActionSheet from 'react-native-actionsheet'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SuccessDialog from "../components/SuccessDialog"
import useGallery from "../hooks/useGallery"
import { useDispatch, useSelector } from "react-redux"
import { User } from "../types"
import { updateProfile } from "../store/actions/authActions"
import TimeZonePicker from "../components/TimezonPicker"

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor:colors.globalBg
}

const LOGIN_TEXT: TextStyle  = {
  fontSize: 30,
  color: colors.primary
}

const INPUT_CONTAINER: ViewStyle = {
  marginTop: 5,
  overflow: 'hidden',
  paddingHorizontal: 15
}

const BUTTONS_CONTAINER: ViewStyle = {
  flex: 1,
  marginTop: 10,
  overflow: 'hidden',
}

const SAVE_BUTTON_STYLE: ViewStyle = {
  marginTop: 30,
  width: "50%",
  alignSelf: 'center'
}

const NAME = "NAME"
const EMAIL = "EMAIL"
const WHATSAPP = "WHATSAPP"

type EditProfileScreenProps = {
  navigation: any
  route: any
}

function EditProfileScreen(props: EditProfileScreenProps) {
  // Pull in navigation via hook
  const { navigation, route } = props

  const userData: User = useSelector((state: any) => state.auth)

  // console.log('userData : ', userData)

  const { openGalleryHandler: openGallery } = useGallery(false)
  const dispatch = useDispatch()

  const nameRef = useRef<TextInput | any>()
  const emailRef = useRef<TextInput | any>()
  const whatsappNumberRef = useRef<TextInput | any>()
  const timezonePickerRef = useRef<any>()

  const [name, setName] = useState(userData?.u_fullname || '')
  const [email, setEmail] = useState(userData?.u_email || '')
  const [waNumber, setWANumber] = useState(userData?.u_contact || '')
  const [image, setImage] = useState<string>(userData?.profile_pic ? (appContants.BASE_IMAGE_URL + userData?.profile_pic) ?? '' : '');
  const [timezone, setTimezone] = useState(userData?.timezonez || '')

  const [isLoading, setIsLoading] = useState(false)

  const onSubmitTextHandler = useCallback((textInputId) => {
    switch (textInputId) {
      case NAME:
        emailRef.current?.focus()
        break
      case EMAIL:
        whatsappNumberRef.current?.focus()
        break
      case WHATSAPP:
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
      case WHATSAPP:
        setWANumber(enteredText)
        break
      default:
        break
    }
  }, [])

  const checkValidation = useCallback(() => {
    try {
      if (!image) {
        ErrorToast("Please upload your profile picture.")
        return false
      }
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
        ErrorToast("Please enter user whatsapp number.")
        return false
      }
      if (!timezone || !timezone.trim()) {
        ErrorToast("Please select your timezone.")
        return false
      }
      return true
    } catch (err: any) {
      console.log('[checkValidation] Error : ', err.message)
      return false
    }
  }, [email, name, waNumber, timezone])

  const savePressHandler = useCallback(async () => {
    try {
      if (checkValidation()) {
        setIsLoading(true)
        await dispatch(updateProfile({
          email,
          filepic: image,
          fullname: name,
          logged_in: userData.u_id,
          phone: waNumber,
          timezone: timezone
        }))
        setIsLoading(false)
        SuccessToast("Profile Updated Successfully")
        navigation.goBack()
      }
    } catch (err: any) {
      setIsLoading(false)
      ErrorToast(err?.message || appContants.SOMETHING_WENT_WRONG)
      console.log('[savePressHandler] Error : ', err.message)
    }
  }, [checkValidation, navigation, dispatch, email, image, name, userData.u_id, waNumber, timezone])

  const openGalleryHandler = useCallback(async () => {
    try {
      const gallerRes = await openGallery("image", true)
      if (gallerRes && gallerRes?.uri) {
        setImage(gallerRes.uri)
      }
    } catch (err: any) {
      console.log('[openGalleryHandler] Error : ', err.message)
    }
  }, [])

  const onTimezoneSelectHandler = useCallback(async (selectedTimezone: string) => {
    try {
        timezonePickerRef?.current?.toggleVisibility()
        setTimezone(selectedTimezone)
        // await delay(200)
        // setIsLoading(true)
        // await dispatch(updateProfile({
        //     timezonez: selectedTimezone
        // }))
        // setIsLoading(false)
    } catch (err: any) {
      setIsLoading(false)
      console.log('Error : ', err.message)
    }
  }, [])

  const onTimezoneChooseHandler = useCallback(() => {
    try {
      timezonePickerRef?.current?.toggleVisibility()
    } catch (err: any) {
      SomethingWentWrongToast()
    }
  }, [])
  
  return (
    <Root unsafe style={ROOT}>
      <StatusBar barStyle={"light-content"} backgroundColor={colors.primary} />
      <AppLoader isVisible={isLoading} />
      <TimeZonePicker
        ref={timezonePickerRef}
        onSelect={onTimezoneSelectHandler}
      />
      <ScrollView
        contentContainerStyle={{
          minHeight: '100%',
        }}
        alwaysBounceVertical={false}
      >
        <View style={INPUT_CONTAINER}>
          <Pressable
            style={{
              marginVertical: 10,
              alignSelf:'center',
              overflow: "hidden",
              height: 80,
              width: 80,
              borderRadius: image ? 40 : 0,
              borderWidth: image ? 2 : 0
            }}
            onPress={openGalleryHandler}
          >
            <Image
              source={image ? { uri: image } : images.ic_edit_user}
              style={{
                height: 80,
                width: 80,
                borderRadius: image ? 40 : 0,
                // overflow: "hidden"
              }}
              resizeMode="contain"
            />
            {!image && <BoldText>{"Your Photo"}</BoldText>}
          </Pressable>
          <RoundedImageInput
            ref={nameRef}
            logo={images.ic_username}
            value={name}
            onChangeText={onTextChangeHandler.bind(null, NAME)}
            autoCapitalize="none"
            keyboardType="default"
            placeholder={"Username"}
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
            placeholder={"Email address"}
            editable={false}
            onSubmitEditing={onSubmitTextHandler.bind(null, EMAIL)}
          />
          <RoundedImageInput
            ref={emailRef}
            logo={images.ic_whatsapp}
            value={waNumber}
            onChangeText={onTextChangeHandler.bind(null, WHATSAPP)}
            autoCapitalize="none"
            keyboardType="numeric"
            placeholder={"Phone Number"}
            onSubmitEditing={onSubmitTextHandler.bind(null, WHATSAPP)}
          />
          <Pressable
            onPress={onTimezoneChooseHandler}
          >
            <RoundedImageInput
              ref={emailRef}
              logo={images.ic_clock}
              value={timezone || 'Your Timezone'}
              autoCapitalize="none"
              placeholder={"Your Timezone"}
              editable={false}
            />
          </Pressable>
        </View>
        <LargeRoundedButton
          style={SAVE_BUTTON_STYLE}
          title={"SAVE"}
          onPress={savePressHandler}
        />
    </ScrollView>
    </Root>
  )
}

export default EditProfileScreen;
