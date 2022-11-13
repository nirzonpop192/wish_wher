import React, { useRef, useEffect, useCallback, useState, useLayoutEffect } from "react";
import { StyleSheet, Platform, ScrollView, View, ViewStyle } from 'react-native'

import WebView from "react-native-webview";
import ViewShot, { captureRef } from "react-native-view-shot"
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import {
    addReminder,
    addReminders,
    updateReminder,
} from '../store/actions/remindersActions';

import {
    ANDROID_READ_STORAGE_PERMISSION,
    ANDROID_WRITE_STORAGE_PERMISSION,
    checkMultiplePermission,
    IOS_GALLERY_PERMISSION,
    requestMultiplePermission
} from "../utils/PermissionUtils"

import BoldText from "../components/BoldText";
import Root from "../components/Root";


import colors from "../constants/colors";
import appContants from "../constants/appContants";
import { ErrorToast, SuccessToast } from "../utils/ToastUtils";
import { height, width } from "../utils/MiscUtils";

import { alertHandler, openSettingsHandler } from "../utils/AlertHandler";

import { MyBackButton, MyHeader } from "../navigation/MainNavigation";
import LargeRoundedButton from "../components/LargeRoundedButton";
import AppLoader from "../components/AppLoader";


import {
    free1,
    free2,
    free3,
    free4,
    free5,
    free6,
    free7,
    free8,
    free9,
    free10,

    premium1,
    premium2,
    premium3,
    premium4,
    premium5,
    premium6,
    premium7,
    premium8,
    premium9,
    premium10,
    premium11,
    premium12,
    premium13,
} from "../cards-html"


const CARD_ID_MAP = {
    "1": free1,
    "2": free2,
    "3": free3,
    "4": free4,
    "5": free5,
    "6": free6,
    "7": free7,
    "8": free8,
    "9": free9,
    "10": free10,

    "premium1": premium1,
    "premium2": premium2,
    "premium3": premium3,
    "premium4": premium4,
    "premium5": premium5,
    "premium6": premium6,
    "premium7": premium7,
    "premium8": premium8,
    "premium9": premium9,
    "premium10": premium10,
    "premium11": premium11,
    "premium12": premium12,
    "premium13": premium13,
}


const SAVE_BUTTON_STYLE: ViewStyle = {
    marginTop: 30,
    width: '50%',
    alignSelf: 'center',
};

type ReminderCardView = {
    navigation: any
    route: any
}

const ReminderCardView = (props: ReminderCardView) => {


    const navigation = useNavigation();
    const { params } = useRoute();
    const dispatch = useDispatch();

    // console.clear()
    // console.log(">>>>> params", params)

    const isEdit = params?.isEdit;
    const isPremiumCard = params?.isPremiumCard;
    const editId = params?.editId;
    const data = params?.data;

    const selected_card = CARD_ID_MAP[data?.card_id];

    const userImg = params?.imgBase64 ? params?.imgBase64 : data.image_data



    const premiumPoints = params?.premiumPoints;
    const updatePremiumPoints = params?.updatePremiumPoints;
    const selectedPremiumCard = params?.selectedPremiumCard;


    const mountedRef = useRef(false) // for managing screen action state
    const viewShotRef = useRef<ViewShot>() // for capturing screenshot
    const [isMounted, setIsMounted] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const type = data?.event_type ?
        data?.event_type === 'Bir'
            ? 'Happy Birthday'
            : 'Happy Anniversary'
        : "";

    useEffect(() => {
        permissionCheck()
        mountedRef.current = true
        setIsMounted(true);
        return () => {
            mountedRef.current = false
            setIsMounted(false)
        }
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            header: ({ navigation, route, options, back }) => {
                return (
                    <MyHeader
                        title={"Card Preview"}
                        leftButton={
                            back ? <MyBackButton onPress={navigation.goBack} /> : undefined
                        }
                        rightButton={undefined}
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
    }, [navigation])



    const captureScreenHandler = async () => {
        try {

            const ssUri = await captureRef(viewShotRef, {
                format: "jpg",
                quality: 1,
                snapshotContentContainer: false,
            });


            const imageFile = ssUri
            console.log('imageFile', imageFile)

            return ssUri;

        } catch (err: any) {
            console.log('[captureScreenHandler] Error : ', err.message)
            ErrorToast(appContants.SOMETHING_WENT_WRONG)
        }
    }

    const permissionCheck = useCallback(async () => {
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
            if (!permissionRes) {

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
                if (!requestPermissionRes) {
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
    }, [])


    const savePressHandler = async () => {
        try {

            setIsLoading(true);

            const uri = await captureScreenHandler();
            data['screenshot'] = uri;

            if (isEdit) {
                await dispatch(updateReminder(data, +editId));
            } else {
                await dispatch(addReminder(data));
            }
            if (isPremiumCard) {
                const newPoints = premiumPoints - 10;
                updatePremiumPoints(newPoints);
                selectedPremiumCard(false);
            }

            setIsLoading(false);
            SuccessToast(`Reminder ${isEdit ? 'Updated' : 'Added'} Successfully`);
            navigation.navigate("home");

        } catch (err) {
            console.log(err?.response?.data ?? err?.message);
            setIsLoading(false);
            ErrorToast(err?.message || appContants.SOMETHING_WENT_WRONG);
            console.log('[savePressHandler] Error : ', err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Root style={styles.container}>
            <AppLoader isVisible={isLoading} />

            <ViewShot
                style={{ 
                    flex: 1, 
                    // backgroundColor: colors.white,
                    backgroundColor: colors.globalBg,
                    width }}
                ref={viewShotRef}
                options={{ format: 'jpg', quality: 1 }}
            >

                <WebView
                    source={{
                        html: selected_card?.({
                            img: userImg,
                            msg: data?.message,
                            name: data?.fullname,
                            type: type
                        })
                    }}
                    style={{
                        flex: 1,
                        resizeMode: 'cover',
                        marginLeft: 0,
                        marginRight: 0,
                        marginTop: 0,
                        marginBottom: 0
                    }}

                    onLoadStart={() => {
                        console.log('load start')
                        setIsLoading(true);
                    }}
                    onLoadEnd={() => {
                        console.log('load end')
                        setIsLoading(false);
                    }}
                    scalesPageToFit={true}
                    onLoadProgress={e => {
                        console.log(e.nativeEvent.progress * 100)
                    }}
                />

            </ViewShot>


            <LargeRoundedButton
                style={SAVE_BUTTON_STYLE}
                title={params?.isEdit ? 'UPDATE' : 'SAVE'}
                onPress={savePressHandler}
            />

        </Root>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: colors.white,
        backgroundColor: colors.globalBg,
    }
})

export default ReminderCardView
