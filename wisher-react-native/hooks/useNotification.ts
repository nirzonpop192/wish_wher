import messaging from '@react-native-firebase/messaging';
import { useEffect, useRef } from 'react';
import {Platform} from 'react-native';

const getNotificationPermissionHandler = async () => {
    return new Promise(async (resolve) => {
        try {
            if (Platform.OS === 'ios') {
                const authStatus = await messaging().requestPermission({
                    criticalAlert: true,
                    provisional: true,
                    announcement: true,
                });
                const enabled = 
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
                resolve(enabled);
            } else {
                resolve(true);
            }
        } catch (err: any) {
            console.log(
                '[NotificationUtils.js-getNotificationPermissionHandler] Error : ',
                err.message,
            );
        }
    });
};

export const getToken = async () => {
    return await messaging().getToken();
};

const getFCMTokenHandler = async () => {
    try {
        var token = '';
        const hasPermission = await messaging().hasPermission();

        if (
            hasPermission === messaging.AuthorizationStatus.AUTHORIZED ||
            hasPermission === messaging.AuthorizationStatus.PROVISIONAL
        ) {
            token = await getToken();
        } else {
            const permissionRes = await getNotificationPermissionHandler();

            if (permissionRes) {
                token = await getToken();
            } else {
                console.log(
                '[NotificationUtils.js-getFCMTokenHandler] no notification permission allowed..',
                );
            }
        }
        return token;
    } catch (err: any) {
        console.log(
            '[NotificationUtils.js-getFCMTokenHandler] Error : ',
            err.message,
        );
        return ''
    }
};

const useNotification = () => {
    const token = useRef('')

    useEffect(() => {
        getFCMTokenHandler()
            .then(messagingToken => {
                token.current = messagingToken
            }).catch((err: any) => {
                console.log('Error : ', err.message)
            })
    }, [])

    return {
        token: token.current,
        getFCMTokenHandler
    }
}

export default useNotification