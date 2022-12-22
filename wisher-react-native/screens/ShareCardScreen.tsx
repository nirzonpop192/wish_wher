import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ActivityIndicator, Platform, Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native'

import Root from "../components/Root";
import BoldText from "../components/BoldText";

import colors from "../constants/colors";
import { delay, height, isIos, width } from "../utils/MiscUtils";
import { MyBackButton, MyHeader } from "../navigation/MainNavigation";
import { Reminder } from "../types";
import WebView from "react-native-webview";
import ViewShot, { captureRef } from "react-native-view-shot"
import {
  ANDROID_READ_STORAGE_PERMISSION,
  ANDROID_WRITE_STORAGE_PERMISSION,
  checkMultiplePermission,
  IOS_GALLERY_PERMISSION,
  requestMultiplePermission
} from "../utils/PermissionUtils"
import Share from 'react-native-share';
import appContants from "../constants/appContants";
import { ErrorToast, SuccessToast } from "../utils/ToastUtils";
import { alertHandler, openSettingsHandler } from "../utils/AlertHandler";

type Params = {
  params: {
    cardDetails: Reminder
  }
}

type ShareCardScreenProps = {
  navigation: any
  route: Params
}

const ShareCardScreen = (props: ShareCardScreenProps) => {
  const { navigation, route } = props
  const params = route?.params

  const reminderType = params?.cardDetails?.event_type
  const reminder: Reminder = params?.cardDetails;

  console.log(reminder.rem_id)

  const url = 'https://wishwisher.com/welcome/gethtmlbyid/' + reminder.rem_id

  const [isLoading, setIsLoading] = useState(false)
  const mountedRef = useRef(false) // for managing screen action state
  const viewShotRef = useRef<ViewShot>() // for capturing screenshot

  // const shareHandler = useCallback(() => {
  //   Share.share({
  //     message:
  //       reminderType === "Birthday"
  //         ? `Age is just your score on the distinguished people list. - From "YOUR NAME HERE"`
  //         : `Wishing a perfect pair a perfectly happy day. From -"YOUR NAME HERE"`,
  //     url: "",
  //     title: "Wish"
  //   })
  // }, [reminderType])

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const getSourceHandler = useCallback((uri) => {
    return uri
    return Platform.OS === 'android'
      ? uri
      : `assets-library://asset/asset.${'jpeg'}?id=${uri.substring(
        5,
        41,
      )}&ext=jpeg`;
  }, []);


  const captureScreenHandler = useCallback(async () => {
    try {
      setIsLoading(true)
      await delay(500)
      setIsLoading(false)
      await delay(500)
      captureRef(viewShotRef, {
        format: "jpg",
        quality: 1,
        snapshotContentContainer: false,
      })
        .then(
          async ssUri => {
            console.log(ssUri)
            setIsLoading(false)

            const imageFile = getSourceHandler(ssUri)

            await Share.open({
              title: 'Wish Wisher App',
              failOnCancel: true,
              url: imageFile,
              type: 'image/jpeg',
            });
          },
          error => {
            setIsLoading(false)
            console.error("Oops, Something Went Wrong", error)
          }
        ).finally(() => {
          setIsLoading(false)
        })
    } catch (err: any) {
      console.log('[captureScreenHandler] Error : ', err.message)
      ErrorToast(appContants.SOMETHING_WENT_WRONG)
    }
  }, [])

  /**
   * To handle permissions before capturing screen
   */
  const shareHandler = useCallback(async () => {
    try {
      const checkPermissions = await checkMultiplePermission(Platform.select({
        android: [
          ANDROID_READ_STORAGE_PERMISSION,
          ANDROID_WRITE_STORAGE_PERMISSION,
        ],
        ios: [
          IOS_GALLERY_PERMISSION
        ]
      }))
      const permissionRes = Object.values(checkPermissions).every((permission) => permission === "granted")
      if (permissionRes) {
        captureScreenHandler()
      } else {
        const requestPermissions = await requestMultiplePermission(Platform.select({
          android: [
            ANDROID_READ_STORAGE_PERMISSION,
            ANDROID_WRITE_STORAGE_PERMISSION,
          ],
          ios: [
            IOS_GALLERY_PERMISSION
          ]
        }))

        const requestPermissionRes = Object.values(requestPermissions).every((permission) => permission === "granted")
        if (requestPermissionRes) {
          captureScreenHandler()
        } else {
          alertHandler(
            "Permission Required",
            `Please allow ${Platform.OS === "ios" ? "Photo Library" : "Storage"} Permission to save captured screen`,
            [
              {
                text: 'Open Settings',
                style: 'default',
                onPress: async () => await openSettingsHandler()
              }
            ]
          )
        }
      }
    } catch (err: any) {
      console.log('[onCaptureScreen] Error : ', err.message)
      ErrorToast("Something went wrong please try again later.")
    }
  }, [captureScreenHandler])

  useLayoutEffect(() => {
    navigation.setOptions({
      header: ({ navigation, route, options, back }) => {
        return (
          <MyHeader
            title={"Preview"}
            leftButton={
              back ? <MyBackButton onPress={navigation.goBack} /> : undefined
            }
            rightButton={
              <Pressable
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={shareHandler}>
                <BoldText>{"SHARE"}</BoldText>
              </Pressable>
            }
            style={{
              height: 55,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        );
      },
    })
  }, [navigation, shareHandler])

  console.log(url);


  return (
    <Root unsafe style={styles.container}>
      <StatusBar
        backgroundColor={colors.primary}
        barStyle={!isIos ? "light-content" : "dark-content"}
      />
      {
        isLoading
          ? (
            <View
              style={{
                position: 'absolute',
                height: "100%",
                width: "100%",
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 500
              }}
            >
              <ActivityIndicator size={"large"} color={colors.primary} />
            </View>
          )
          : null
      }
      <ViewShot
        style={{
          flexGrow: 1,
          backgroundColor: colors.white,
          // backgroundColor: colors.globalBg,
          height, width
        }}
        ref={viewShotRef}
        options={{ format: 'jpg', quality: 1 }}
      >
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: colors.globalBg,
          }}
          contentContainerStyle={{
            minHeight: height,
            minWidth: width,
            backgroundColor: colors.globalBg,
          }}
        >
          {/* <View style={{ marginTop: 20 }} /> */}
          <WebView
            source={{ uri: url }}
            style={{
              flex: 1,
              // backgroundColor: 'yellow',
              resizeMode: 'cover',
              // width: width,
              // height: height,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0
            }}
            // containerStyle={{
            //   minHeight: "100%",
            //   minWidth: "100%"
            // }}
            onLoadStart={() => {
              console.log('load start')
              setIsLoading(true)
            }}
            onLoadEnd={() => {
              console.log('load end')
              setIsLoading(false)
            }}
            scalesPageToFit={true}
            onLoadProgress={e => {
              console.log(e.nativeEvent.progress * 100)
            }}
          />
        </ScrollView>
      </ViewShot>
    </Root>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: colors.globalBg,
  }
})

export default ShareCardScreen
