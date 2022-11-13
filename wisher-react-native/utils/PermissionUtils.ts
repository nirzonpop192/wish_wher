import { check, checkMultiple, PERMISSIONS, request, requestMultiple } from 'react-native-permissions'

export const ANDROID_READ_STORAGE_PERMISSION =
  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
export const ANDROID_WRITE_STORAGE_PERMISSION =
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
export const IOS_GALLERY_PERMISSION = PERMISSIONS.IOS.PHOTO_LIBRARY

export const checkPermission = async (permission: any) => {
  try {
    return await check(permission)
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export const requestPermission = async (permission: any) => {
  try {
    return await request(permission)
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export const checkMultiplePermission = async (permissions: any) => {
  try {
    return await checkMultiple(permissions)
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export const requestMultiplePermission = async (permissions: any) => {
  try {
    return await requestMultiple(permissions)
  } catch (err: any) {
    throw new Error(err.message)
  }
}
