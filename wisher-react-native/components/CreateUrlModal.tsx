import React, { forwardRef, useState, useImperativeHandle, useCallback, useEffect, useMemo } from 'react'
import { View, StyleSheet, Alert, Pressable, Image, ImageRequireSource, ViewStyle, Share, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import images from '../assets/images';

import colors from '../constants/colors'
import { MyHeaderButton } from '../navigation/MainNavigation';

import axios from '../axios.auth'

import { delay, height, width } from '../utils/MiscUtils'
import { ErrorToast } from '../utils/ToastUtils';
import BoldText from './BoldText';
import LargeRoundedButton from './LargeRoundedButton';
import RegularText from './RegularText';
import { useSelector } from 'react-redux';
import { User } from '../types';
import { AxiosResponse } from 'axios';
import appContants from '../constants/appContants';

type ImageTextButtonProps = {
    image: ImageRequireSource
    text: string
    onPress(): void
    style?: ViewStyle
}

const ImageTextButton = (props: ImageTextButtonProps) => {
    const { image, text, onPress, style } = props
    return (
        <Pressable
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                ...style
            }}
            onPress={onPress}
        >
            <Image
                source={image}
                style={{ height: 30, width: 30, marginRight: 5 }}
                resizeMode="contain"
            />
            <BoldText>{text}</BoldText>
        </Pressable>
    )
}

const CreateUrlModal = forwardRef((props, ref) => {
    const [isVisible, setVisible] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [occasionType, setOccasionType] = useState('')
    const userData: User = useSelector((state: any) => state.auth)

    const birthdayImage = useMemo(() => occasionType === 'Bir' ? images.ic_checked : images.ic_unchecked, [occasionType])
    const anniversaryImage = useMemo(() => occasionType === 'Anni' ? images.ic_checked : images.ic_unchecked, [occasionType])

    useEffect(() => {
        if (isVisible && occasionType) {
            setOccasionType('')
        }
    }, [isVisible])
    
    const dismissHandler = useCallback(() => {
        if (isLoading){
            return
        }
        setVisible(false)
    }, [isLoading])

    const setVisibleHandler = useCallback(() => {
        setVisible(true)
    }, [])

    const refInitHandler = useCallback(() => {
        return {
            setVisibleHandler,
            dismissHandler
        }
    }, [])

    useImperativeHandle(ref, refInitHandler, [refInitHandler])

    const occasionSelectHandler = useCallback((occasion: "Bir" | "Anni") => {
        setOccasionType(occasion)
    }, [])

    const onCreateUrlHandler = useCallback(async () => {
        try {
            if (!occasionType) {
                ErrorToast("Please select occasion type first.")
                return
            }

            const body = {
                logged_in: userData.u_id,
                event_type: occasionType
            }
            setLoading(true)
            const createUrlRes: AxiosResponse<any> = await axios.post('authentication/addlink', body)
            setLoading(false)
            dismissHandler()
            await delay(500)
            if (createUrlRes.data) {
                const { status, message, url } = createUrlRes.data
                if (status) {
                    await Share.share({
                        title: `Wish Wisher App`,
                        message: `${userData.u_fullname} is inviting you to add your ${occasionType === 'Bir' ? 'Birthday' : 'Anniversary'} details on wishwisher.\n\n Follow this link ${url}`,
                        // url: url
                    }, {
                        dialogTitle: "Share",
                        subject: "Add Reminder",
                        tintColor: colors.primary
                    })
                }
            }
        } catch (err: any) {
            setLoading(false)
            console.log('Error : ', err.message)
            ErrorToast(appContants.SOMETHING_WENT_WRONG)
        }
    }, [occasionType, dismissHandler, userData])

    return (
        <Modal
            isVisible={isVisible}
            onDismiss={dismissHandler}
            onBackButtonPress={dismissHandler}
            onBackdropPress={dismissHandler}
            animationIn="fadeIn"
            animationOut={"fadeOut"}
            useNativeDriver={true}
        >
            <View style={styles.container}>
                {
                    isLoading
                    ? (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator color={colors.primary} size="large" />
                        </View>
                    )
                    : (
                        <>
                            <BoldText>{"Don’t have all the required information?"}</BoldText>
                            <RegularText>{"Invite your friends and family with the link to complete their details."}</RegularText>
                            <View style={{ flex: 1 }}>
                                <BoldText style={{ marginTop: 20 }} >{"Select Occasion"}</BoldText>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        marginTop: 15
                                    }}
                                >
                                    <ImageTextButton
                                        image={birthdayImage}
                                        text={"Birthday"}
                                        onPress={occasionSelectHandler.bind(null, "Bir")}
                                    />
                                    <ImageTextButton
                                        image={anniversaryImage}
                                        text={"Anniversary"}
                                        onPress={occasionSelectHandler.bind(null, "Anni")}
                                        style={{ marginLeft: 20 }}
                                    />
                                </View>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'flex-end'
                                }}
                            >
                                <LargeRoundedButton
                                    title='CREATE URL'
                                    onPress={onCreateUrlHandler}
                                    style={{ width: width / 2 }}
                                />
                                <LargeRoundedButton
                                    title='BACK'
                                    onPress={dismissHandler}
                                    style={{ width: width / 2 }}
                                />
                            </View>
                        </>
                    )
                }
            </View>
        </Modal>
    )
})

const styles = StyleSheet.create({
    container: {
        height: 290,
        // backgroundColor: colors.white,
        backgroundColor: colors.globalBg,
        borderRadius: 10,
        padding: 15
    }
})

export default CreateUrlModal
