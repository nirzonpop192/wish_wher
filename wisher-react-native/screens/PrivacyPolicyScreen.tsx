import React from "react";
import { StyleSheet } from 'react-native'
import BoldText from "../components/BoldText";
import Root from "../components/Root";

type PrivacyPolicyScreenProps = {
    navigation: any
    route: any
}

const PrivacyPolicyScreen = (props: PrivacyPolicyScreenProps) => {
    return (
        <Root unsafe style={styles.container}>
            <BoldText>{"Privacy Policy"}</BoldText>
        </Root>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default PrivacyPolicyScreen
