import React from "react";
import { Image, Pressable, StyleSheet, View } from 'react-native'
import images from "../assets/images";
import colors from "../constants/colors";
import BoldText from "./BoldText";
import RegularText from "./RegularText";

type ListItemProps = {
  text: string
  eventType: "Bir" | "Anni" | string,
  eventDate: string,
  onPress(): any,
  onShare(): any
  onDelete(): any
}

const ListItem = (props: ListItemProps) => {
  const {
    text,
    eventType,
    eventDate,
    onPress,
    onShare,
    onDelete
  } = props

  return (
    <Pressable
      onPress={onPress}
      style={styles.container}
    >
      <View
        style={styles.textDataContainer}
      >
        <BoldText numberOfLines={1}>{text}</BoldText>
        <RegularText
          style={styles.eventTypeText}
        >
          {eventType === "Bir" ? "Birthday" : "Anniversary"} - {eventDate.substring(5)}
        </RegularText>
      </View>
      <Pressable
        onPress={onShare}
        style={styles.shareBtn}>
        <BoldText>{"SHARE"}</BoldText>
      </Pressable>
      <Pressable
        onPress={onDelete}
        style={styles.deleteBtn}>
        <BoldText>{"DELETE"}</BoldText>
      </Pressable>
      <Pressable
        onPress={onPress}
        style={styles.editBtn}>
        <BoldText>{"EDIT"}</BoldText>
      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 30,
    borderColor: '#00000080',
    marginTop: 10,
  },
  textDataContainer: {
    marginLeft: 5,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  eventTypeText: {
    color: colors.lightGrey,
    fontSize: 14
  },
  editBtn: { paddingHorizontal: 5, paddingVertical: 10 },
  shareBtn: { paddingHorizontal: 5, paddingVertical: 10 },
  deleteBtn: { paddingHorizontal: 5, paddingVertical: 10 }
})

export default ListItem
