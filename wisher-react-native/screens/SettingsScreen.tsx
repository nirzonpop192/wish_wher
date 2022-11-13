import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Image, ImageRequireSource, Pressable, Share, Alert, Linking } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useDispatch, useSelector } from "react-redux";
import { logout, deleteAccount } from "../store/actions/authActions";

import Root from "../components/Root";
import BoldText from "../components/BoldText";

import images from "../assets/images";
import colors from "../constants/colors";

import { ErrorToast, SomethingWentWrongToast, SuccessToast } from "../utils/ToastUtils";
import { User } from "../types";
import appContants from "../constants/appContants";
import AppLoader from "../components/AppLoader";

const Separator = (props: any) => {
    return (
        <View style={{ width: '95%', alignSelf: 'center', height: 1, borderWidth: 0.5, borderColor: colors.primary, marginVertical: 10 }} />
    )
}

type TextLogoButtonProps = {
    logo: ImageRequireSource
    text: string
    onPress: () => any
}

const TextLogoButton = (props: TextLogoButtonProps) => {
    const {
        logo,
        text,
        onPress
    } = props
    return (
        <Pressable
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10
            }}
            onPress={onPress}
        >
            <Image
                source={logo}
                style={{
                    height: 22,
                    width: 22,
                    marginHorizontal: 15
                }}
            />
            <View style={{ flex: 1 }}>
                <BoldText style={{ fontSize: 16 }}>{text}</BoldText>
            </View>
        </Pressable>
    )
}

type SettingsScreenProps = {
    route: any
    navigation: any
}

const SettingsScreen = (props: SettingsScreenProps) => {
    const { navigation } = props

    const userData: User = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()

    const userId = useMemo(() => userData.u_id, [userData?.u_id])

    const timezonePickerRef = useRef<any>()

    const [isDatePickerVisible, setDatePickerVisible] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    const confirmLogout = useCallback(async () => {
        try {
            setLoading(true)
            await dispatch(logout(userId))
            SuccessToast('Logout Successfully.')
        } catch (err: any) {
            ErrorToast("Logout Successfully.")
        } finally {
            mountedRef.current && setLoading(false)
        }
    }, [userId])

    const confirmDeleteAccount = useCallback(async () => {
        try {
            setLoading(true)
            await dispatch(deleteAccount(userId))
            SuccessToast('Account Deleted Successfully.')
        } catch (err: any) {
            ErrorToast("Account Deleted Successfully.")
        } finally {
            mountedRef.current && setLoading(false)
        }
    }, [userId])

    const logoutHandler = useCallback(() => {
        Alert.alert(
            'Are you sure?',
            'You are about to logout from the app.',
            [
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: confirmLogout
                },
                {
                    text: "CANCEL",
                    style: "cancel",
                },
            ]
        )
    }, [confirmLogout]);

    const shareAppHandler = useCallback(async () => {
        const shareMsg = `Download Wish Wisher App.\nhttps://play.google.com/store/apps/details?id=com.wishwisher\nhttps://apps.apple.com/app/id1600936249`;

        try {
            await Share.share({
                // url: "www.google.com",
                message: shareMsg,
                title: "Wish Wisher"
            }, {
                dialogTitle: "Share",
                tintColor: colors.primary,
            })
        } catch (err: any) {
            console.log('Error : ', err.message)
            ErrorToast(appContants.SOMETHING_WENT_WRONG)
        }
    }, [])


    const deleteAccountHandler = useCallback(() => {
        Alert.alert(
            'Are you sure?',
            'You are about to delete your WishWisher account.\n\nThis action is irreversible',
            [
                {
                    text: "Confirm",
                    style: "destructive",
                    onPress: confirmDeleteAccount
                },
                {
                    text: "CANCEL",
                    style: "cancel",
                },
            ]
        )
    }, [confirmLogout])

    const actionHandler = useCallback((action: string) => {
        switch (action) {
            case "delete_account":
                deleteAccountHandler();
                break;
            case "logout":
                logoutHandler()
                break
            case "edit":
                navigation.navigate('editProfile')
                break
            case "share":
                shareAppHandler()
                break
            case "change":
                navigation.navigate('changePassword')
                break
            case "about":
                navigation.navigate('aboutUs')
                break
            case "ppolicy":
                // navigation.navigate('privacyPolicy')
                Linking.canOpenURL(appContants.ppolicyUrl)
                    .then(canOpenUrl => {
                        if (canOpenUrl) {
                            Linking.openURL(appContants.ppolicyUrl)
                        } else {
                            SomethingWentWrongToast()
                        }
                    })
                    .catch((err: any) => {
                        SomethingWentWrongToast()
                    })
                break
            case "notification_time":
                timezonePickerRef?.current?.toggleVisibility()
                break
        }
    }, [navigation, shareAppHandler, logoutHandler])

    return (
        <Root style={styles.container}>
            <AppLoader isVisible={isLoading} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={(selectedDate: any) => {
                    setDatePickerVisible(false)
                }}
                onCancel={() => {
                    setDatePickerVisible(false)
                }}
            />
            <TextLogoButton
                logo={images.ic_edit}
                onPress={actionHandler.bind(null, "edit")}
                text="Your Profile"
            />
            <TextLogoButton
                logo={images.ic_change_password}
                onPress={actionHandler.bind(null, "change")}
                text="Change Password"
            />
            <Separator />
            <TextLogoButton
                logo={images.ic_ppolicy}
                onPress={actionHandler.bind(null, "ppolicy")}
                text="Privacy Policy"
            />
            <Separator />
            <TextLogoButton
                logo={images.ic_share}
                onPress={actionHandler.bind(null, "share")}
                text="Share app"
            />
            <TextLogoButton
                logo={images.ic_delete}
                onPress={actionHandler.bind(null, "delete_account")}
                text="Delete My Account"
            />
            <TextLogoButton
                logo={images.ic_logout}
                onPress={actionHandler.bind(null, "logout")}
                text="Logout"
            />
        </Root>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: colors.globalBg
    }
})

export default SettingsScreen

// 2. Push notification needs to happen every year- one day before the anniversary and the anniversary date every year. I noticed an issue with notification also- if I amend a user’s anniversary date, notification does not happen for a new date. For example, if the date was Aug 12th and I already got a notification and then I edit the date to Aug 16th. I don’t get a notification again for Aug 16th.
// 3. Emailing of cards to celebrant needs to be sent every year on the date of the event

// 4. This is optional- can you change the color background of the app to a brighter blue?