import React from "react";
import { StyleSheet, View } from 'react-native'
import BoldText from "../components/BoldText";
import Root from "../components/Root";

type AboutUsScreenProps = {
    navigation: any
    route: any
}

const AboutUsScreen = (props: AboutUsScreenProps) => {
    return (
        <Root style={styles.container}>
            <BoldText>{"About Us"}</BoldText>
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

export default AboutUsScreen
