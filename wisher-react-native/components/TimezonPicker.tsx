import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { FlatList, Pressable, View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import colors from '../constants/colors'
import timezone from '../data/timezone.json'
import BoldText from './BoldText'
import { height, isIos } from '../utils/MiscUtils'

type TimeZonePickerProps = {
    onSelect(selectedTimezone: string): any
}

const TimeZonePicker = forwardRef((props: TimeZonePickerProps, ref) => {
    const { onSelect } = props
    
    const [isVisible, setVisible] = useState(false)

    const toggleVisibility = useCallback(() => {
        setVisible(prevState => !prevState)
    }, [])

    const returnVals = useCallback(() => {
        return {
            isVisible,
            toggleVisibility
        }
    }, [])
    
    useImperativeHandle(ref, returnVals, [isVisible,toggleVisibility])

    const keyExtractorHandler = useCallback((_item, index) => {
        return index
    }, [])

    const renderTimezonesHandler = useCallback((itemObj) => {
        try {
            const { item, index } = itemObj
            return (
                <Pressable
                    key={index}
                    style={styles.timeZoneItem}
                    onPress={onSelect.bind(null, item)}
                >
                    <BoldText>{item}</BoldText>
                </Pressable>
            )
        } catch(err: any) {
            console.log('[renderTimezonesHandler] Error : ', err.message)
            return null
        }
    }, [onSelect])

    return (
        <Modal
            isVisible={isVisible}
            animationIn='fadeIn'
            animationOut={'fadeOut'}
            onBackButtonPress={toggleVisibility}
            onBackdropPress={toggleVisibility}
            useNativeDriver={!isIos}
        >
            <View style={styles.container}>
                <FlatList
                    data={timezone}
                    keyExtractor={keyExtractorHandler}
                    renderItem={renderTimezonesHandler}
                    maxToRenderPerBatch={48}
                    initialNumToRender={48}
                    showsVerticalScrollIndicator={true}
                />
            </View>
        </Modal>

    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: height / 1.5,
        backgroundColor: colors.lighterGrey
    },
    timeZoneItem: {
        height: 45,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default  TimeZonePicker

