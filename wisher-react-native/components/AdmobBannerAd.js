import { Platform } from 'react-native'
import React from 'react'

import {
    BannerAd,
    BannerAdSize,
    TestIds
} from 'react-native-google-mobile-ads';


let adUnitId = Platform.OS == "ios" ? 'ca-app-pub-6913209057057592/5000531651' : "ca-app-pub-6913209057057592/8165751046";
// adUnitId = TestIds.BANNER

export default function AdmobBannerAd() {
    return (

        <BannerAd unitId={adUnitId} size={BannerAdSize.FULL_BANNER} />

    )
}