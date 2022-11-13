import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import BoldText from "../components/BoldText";
import images from "../assets/images";
import RegularText from "../components/RegularText";
import colors from "../constants/colors";
import Root from "../components/Root";
import { useSelector } from "react-redux";
import { Reminder } from "../types";
import { convertAPIToCalendarFormat, convertUnixDateToAPIFormat } from "../utils/MiscUtils";
import ListItem from "../components/ListItem";

type CalendarScreenProps = {
  route: any
  navigation: any
}

const bday = { key: 'bday', color: colors.white, selectedColor: colors.primary, selectedTextColor: 'black' };
const anniversary = { key: 'anniversary', color: 'pink', selectedColor: colors.primary, selectedTextColor: 'black' };

const CalendarScreen = (props: CalendarScreenProps) => {
  const { navigation } = props

  const allData = useSelector((state: any) => state.reminders.allData)

  const [data, setData] = useState<any>([])
  const [calendarData, setCalendarData] = useState<any>([])
  const [selectedDate, setSelectedDate] = useState('')
  // const [listData, setListData] = useState()
  const [listDates, setListDates] = useState<any>([])

  const editReminderHandler = useCallback((reminderData: any) => {
    navigation.navigate('addReminder', {
      reminderData
    })
  }, [navigation])

  useEffect(() => {
    const datesData: any = {}
    const currDate = new Date().getTime()
    const currApiDate = convertAPIToCalendarFormat(convertUnixDateToAPIFormat(currDate))
    setSelectedDate(currApiDate)
    const convertedData = allData.reduce((accumulator: any, succedor: Reminder) => {
      const convertedDate = convertAPIToCalendarFormat(succedor.event_date)
      if (!accumulator[convertedDate]) {
        const filteredReminders = allData.filter((reminder: Reminder) => reminder.event_date === succedor.event_date)

        const isHavingBday = filteredReminders.some((reminder: Reminder) => reminder.event_type.toLowerCase() === 'bir')
        const isHavingAnni = filteredReminders.some((reminder: Reminder) => reminder.event_type.toLowerCase() === 'anni')

        let eventsArr: { key: string; color: string; selectedColor: string; selectedTextColor: string; }[] = []

        if (isHavingAnni || isHavingBday) {
          if (isHavingAnni && isHavingBday) {
            eventsArr = [
              bday,
              anniversary
            ]
          } else if (isHavingBday) {
            eventsArr = [
              anniversary
            ]
          } else if (isHavingAnni) {
            eventsArr = [
              anniversary
            ]
          }
        }

        console.log("filteredReminders ", filteredReminders)
        console.log("convertedDate ", datesData)
        datesData[convertedDate] = filteredReminders


        if (convertedDate !== "Invalid date") {
          accumulator[convertedDate] = {
            dots: eventsArr,
            selected: currApiDate === convertedDate
          }
        }
      }

      return accumulator
    }, {})

    setCalendarData(convertedData)
    setData(datesData)
    setListDates(Object.keys(datesData))
  }, [allData])

  const shareCardHandler = useCallback((cardDetails: any) => {
    navigation.navigate('shareCard', {
      cardDetails
    })
  }, [navigation])

  const renderItemHandler = useCallback(({ item, index }: { item: Reminder, index: number }) => {
    try {
      const {
        by_user,
        celeb_picture,
        email,
        event_date,
        event_type,
        message,
        rem_id,
        rem_name,
        whatsapp
      } = item

      return (
        <ListItem
          key={index}
          text={rem_name}
          eventDate={event_date}
          eventType={event_type}
          onPress={editReminderHandler.bind(null, item)}
          onShare={shareCardHandler.bind(null, item)}
        />
      )
    } catch (err: any) {
      console.log('Error : ', err.message)
      return null
    }
  }, [editReminderHandler, shareCardHandler])

  const renderListHeader = useCallback(() => {
    if (!selectedDate) {
      return null
    } else {
      return (
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <BoldText style={{ fontSize: 16 }}>{"Selected Date : " + selectedDate}</BoldText>
        </View>
      )
    }
  }, [selectedDate])

  console.log("listDates ", listDates)

  return (
    <Root style={styles.container}>
      {
        !calendarData
          ?
          null
          : (
            <Calendar
              // Initially visible month. Default = now
              current={moment().format('YYYY-MM-DD')}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              // minDate={'2012-05-10'}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              // maxDate={'2012-05-30'}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={(day) => {
                // console.log('selected day', day)
                const { dateString } = day
                console.log(dateString)
                setSelectedDate(dateString)
              }}
              // Handler which gets executed on day long press. Default = undefined
              onDayLongPress={(day) => { console.log('selected day', day) }}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              // monthFormat={'yyyy MM'}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onMonthChange={(month) => { console.log('month changed', month) }}
              // Hide month navigation arrows. Default = false
              // hideArrows={true}
              // Replace default arrows with custom ones (direction can be 'left' or 'right')
              // renderArrow={(direction) => (<Arrow/>)}
              // Do not show days of other months in month page. Default = false
              hideExtraDays={true}
              // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
              // day from another month that is visible in calendar page. Default = false
              // disableMonthChange={true}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
              // firstDay={1}
              // Hide day names. Default = false
              // hideDayNames={true}
              // Show week numbers to the left. Default = false
              // showWeekNumbers={true}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={subtractMonth => subtractMonth()}
              // Handler which gets executed when press arrow icon right. It receive a callback can go next month
              onPressArrowRight={addMonth => addMonth()}
              // Disable left arrow. Default = false
              // disableArrowLeft={true}
              // Disable right arrow. Default = false
              // disableArrowRight={true}
              // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
              // disableAllTouchEventsForDisabledDays={true}
              // Replace default month and year title with custom one. the function receive a date as parameter
              // renderHeader={(date) => {/*Return JSX*/}}
              // Enable the option to swipe between months. Default = false
              enableSwipeMonths={true}
              // markingType="multi-period"
              // markedDates={{
              //   // '2022-01-15': {
              //   //   selected: true,
              //   //   marked: true,
              //   //   activeOpacity: 0,
              //   //   selectedColor: colors.primary,
              //   // },
              //   // '2022-01-01': {
              //   //   selected: true,
              //   //   marked: true,
              //   //   dotColor: colors.primary,
              //   //   activeOpacity: 0,
              //   // },
              //   // '2022-01-30': {
              //   //   selected: true,
              //   //   marked: true,
              //   //   selectedColor: colors.primary,
              //   //   activeOpacity: 0,
              //   // }
              //   '2022-02-20': {dots: [vacation, massage, workout], selected: true, selectedColor: 'green'},
              //   '2022-02-22': {dots: [massage, workout], disabled: false}
              // }}
              markingType={'multi-dot'}
              // markedDates={{
              //   '2022-02-20': {dots: [bday, anniversary], selected: true},
              //   '2022-02-22': {dots: [anniversary]}
              // }}
              markedDates={calendarData}
              style={{
                // backgroundColor: 'transparent',
                backgroundColor: colors.globalBg,

              }}
              theme={{
                calendarBackground: colors.secondry,
              }}
            />
          )
      }


      <FlatList
        data={data[selectedDate] || []}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItemHandler}
        contentContainerStyle={{
          paddingBottom: 20,
          minHeight: "50%",
        }}
        onEndReachedThreshold={0.01}
        // onRefresh={getUserGoalsHandler.bind(null, true)}
        // refreshing={isRefreshing}
        ListHeaderComponent={renderListHeader}
        stickyHeaderIndices={[0]}
      />



    </Root>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.globalBg
    // alignItems: 'center',
    // justifyContent: 'center'
  }
})

export default CalendarScreen
