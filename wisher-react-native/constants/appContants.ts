import Permissions from 'react-native-permissions'

export default {
    BASE_URL: 'https://wishwisher.com/api',
    BASE_IMAGE_URL: 'https://wishwisher.com/uploads/',
    ppolicyUrl: 'https://docs.google.com/document/d/1-nT-qnhKr2mI1sHhYvCqgKrx-vjLL3ur/edit?usp=sharing&ouid=106847395455184555870&rtpof=true&sd=true',


    // BASE_URL: 'http://localhost/wisher/api',
    // BASE_IMAGE_URL: 'http://localhost/wisher/uploads/',

    appName: 'Wish Wisher',

    SOMETHING_WENT_WRONG: 'Something went wrong please try again.',

    // storage permissions
    IOS_PHOTO_LIBRARY_PERMISSION: Permissions.PERMISSIONS.IOS.PHOTO_LIBRARY,
    ANDROID_READ_STORAGE_PERMISSION: Permissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ANDROID_WRITE_STORAGE_PERMISSION: Permissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,

    // camera permissions
    // ANDROID_CAMERA_PERMISSION: Permissions.PERMISSIONS.ANDROID.CAMERA,
    // IOS_CAMERA_PERMISSION: Permissions.PERMISSIONS.IOS.CAMERA,

    // // calendar permissions
    // ANDROID_CALENDAR_READ_PERMISSION: PERMISSIONS.ANDROID.READ_CALENDAR,
    // ANDROID_CALENDAR_WRITE_PERMISSION: PERMISSIONS.ANDROID.WRITE_CALENDAR,
    // IOS_CALENDAR_PERMISSION: PERMISSIONS.IOS.CALENDARS,

    // // microphone permissions
    // ANDROID_MICROPHONE_PERMISSION: PERMISSIONS.ANDROID.RECORD_AUDIO,
    // IOS_MICROPHONE_PERMISSION: PERMISSIONS.IOS.MICROPHONE,
}