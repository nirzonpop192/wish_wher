import { useCallback } from 'react'
import { Platform } from 'react-native'
import Permissions, { openSettings } from 'react-native-permissions'
import ImageCropPicker, { Options } from "react-native-image-crop-picker"

import appConstants from '../constants/appContants'
import { alertHandler } from '../utils/AlertHandler'
import { isIos } from '../utils/MiscUtils'

type PossibleValues = -1 | 0 | 1

const useGallery = (multiple = false) => {
  const getPermissionHandler = useCallback(async () => {
    try {
      const reqRes = await Permissions.requestMultiple(Platform.select({
        android: [appConstants.ANDROID_READ_STORAGE_PERMISSION, appConstants.ANDROID_WRITE_STORAGE_PERMISSION],
        ios: [appConstants.IOS_PHOTO_LIBRARY_PERMISSION],
      }))

      if (isIos) {
        if (reqRes['ios.permission.PHOTO_LIBRARY'] === "granted") {
          return 1
        } else if (reqRes['ios.permission.PHOTO_LIBRARY'] === "blocked") {
          return -1
        } else if (reqRes['ios.permission.PHOTO_LIBRARY'] === "denied") {
          return 0
        } else {
          return -1
        }
      } else {
        if (reqRes['android.permission.WRITE_EXTERNAL_STORAGE'] === "granted" && reqRes['android.permission.READ_EXTERNAL_STORAGE'] === "granted") {
          return 1
        } else if (reqRes['android.permission.WRITE_EXTERNAL_STORAGE'] === "blocked" || reqRes['android.permission.READ_EXTERNAL_STORAGE'] === "blocked") {
          return -1
        } else if (reqRes['android.permission.WRITE_EXTERNAL_STORAGE'] === "denied" || reqRes['android.permission.READ_EXTERNAL_STORAGE'] === "denied") {
          return 0
        } else {
          return -1
        }
      }
    } catch (err: any) {
      console.log('useGallery - getPermissionHandler : ', err.message)
      return -1
    }
  }, [])

  const checkPermissionHandler = useCallback(async (): Promise<PossibleValues> => {
    try {
      const reqRes = await Permissions.checkMultiple(Platform.select({
        android: [appConstants.ANDROID_READ_STORAGE_PERMISSION, appConstants.ANDROID_WRITE_STORAGE_PERMISSION],
        ios: [appConstants.IOS_PHOTO_LIBRARY_PERMISSION],
      }))

      if (isIos) {
        if (reqRes['ios.permission.PHOTO_LIBRARY'] === "granted") {
          return 1
        } else if (reqRes['ios.permission.PHOTO_LIBRARY'] === "blocked") {
          return -1
        } else if (reqRes['ios.permission.PHOTO_LIBRARY'] === "denied") {
          return 0
        } else {
          return -1
        }
      } else {
        if (reqRes['android.permission.WRITE_EXTERNAL_STORAGE'] === "granted" && reqRes['android.permission.READ_EXTERNAL_STORAGE'] === "granted") {
          return 1
        } else if (reqRes['android.permission.WRITE_EXTERNAL_STORAGE'] === "blocked" || reqRes['android.permission.READ_EXTERNAL_STORAGE'] === "blocked") {
          return -1
        } else if (reqRes['android.permission.WRITE_EXTERNAL_STORAGE'] === "denied" || reqRes['android.permission.READ_EXTERNAL_STORAGE'] === "denied") {
          return 0
        } else {
          return -1
        }
      }
    } catch (err: any) {
      console.log('useGallery - checkPermissionHandler : ', err.message)
      return -1
    }
  }, [])

  const openGallery = useCallback(async (mediaType = "image", compress: boolean) => {
    const imageConfig: Options = compress ? {
      maxFiles: 1,
      useFrontCamera: false,
      mediaType: "photo",
      height: 350,
      width: 350,
      compressImageQuality: 1,
      cropping: true,
      freeStyleCropEnabled: false,
      multiple: multiple,
      writeTempFile: false,
      includeBase64: true
    } : {
      maxFiles: 1,
      useFrontCamera: false,
      mediaType: "photo",
      compressImageQuality: 1,
      multiple: multiple,
      writeTempFile: true,
      height: 350,
      width: 350,
      includeBase64: true
    }

    const videoConfig: Options = {
      maxFiles: 1,
      mediaType: "video",
      multiple: multiple
    }
    const galleryRes = await ImageCropPicker.openPicker(mediaType === "image" ? imageConfig : videoConfig)
    const uri = mediaType === "image" ? galleryRes.path : isIos ? galleryRes.sourceURL : galleryRes.path
    const base64 = galleryRes.data;
    const endsWith = uri.split('.').pop()
    const unixTime = new Date().getTime()

    return {
      name: `${unixTime}`,
      uri,
      extension: endsWith,
      createdAt: unixTime,
      size: galleryRes.size,
      base64: `data:${galleryRes.mime};base64,${base64}`
    }
  }, [multiple])

  const showPermissionAlertHandler = useCallback(() => {
    try {
      const title = "Permission Required"
      const description = `Please allow ${isIos ? "Photos" : "Storage"} permission to continue.`
      const openSettingsText = "Open Settings"
      alertHandler(
        title,
        description,
        [
          {
            text: openSettingsText,
            style: 'default',
            onPress: async () => await openSettings()
          }
        ]
      )
    } catch (err: any) {
      console.log('[showPermissionAlertHandler] Error : ', err.message)
    }
  }, [])

  const openGalleryHandler = useCallback(async (mediaType = "image", compress = true) => {
    try {
      const checkPermissionRes = await checkPermissionHandler()
      let requestPermissionRes = -1
      switch (checkPermissionRes) {
        case 1:
          return await openGallery(mediaType, compress)
        case 0:
          requestPermissionRes = await getPermissionHandler()
          switch (requestPermissionRes) {
            case 1:
              return await openGallery(mediaType, compress)
            case 0:
            case -1:
              showPermissionAlertHandler()
              break
          }
          break
        case -1:
          showPermissionAlertHandler()
          break
      }
    } catch (err: any) {
      console.log('Error : ', err.message)
      throw new Error(err?.message)
    }
  }, [checkPermissionHandler, getPermissionHandler, openGallery, showPermissionAlertHandler])

  return {
    openGalleryHandler
  }
}

export default useGallery
