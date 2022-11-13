import React from "react";
import { View, StyleSheet, Image } from 'react-native'
import Modal from 'react-native-modal'
import animations from "../assets/animations";

const SuccessDialog = (props: any) => {
    const {
        isVisible,

    } = props
    return (
        <Modal
            isVisible={isVisible}
        >
            <View
                style={{
                    height: 200,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={animations.ic_success}
                    style={{
                        height: 100,
                        width: 100
                    }}
                    resizeMode="contain"
                />
            </View>
        </Modal>
    )
}

export default SuccessDialog;

