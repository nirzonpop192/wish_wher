import React from 'react'
import { View, ViewStyle, TextStyle, StyleSheet } from 'react-native'
import BoldText from './BoldText'

type ListHeaderProps = {
    containerStyle?: ViewStyle,
    textStyle?: TextStyle,
    text: string
}

const ListHeader = (props: ListHeaderProps) => {
    const { containerStyle, textStyle, text } = props
    return (
        <View
            style={[
                styles.container,
                containerStyle
            ]}
        >
            <BoldText
                style={[
                    styles.textStyle,
                    textStyle,
                ]}
            >
                {text}
            </BoldText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    textStyle: {
        fontSize: 16
    }
})

export default ListHeader
