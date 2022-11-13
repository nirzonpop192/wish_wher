/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from "react"
import {
  View,
  ViewStyle,
  ImageRequireSource,
  StatusBar,
  FlatList,
} from "react-native"
import messaging from '@react-native-firebase/messaging';
import AdmobBannerAd from "../components/AdmobBannerAd";
import BoldText from "../components/BoldText"
import AppLoader from "../components/AppLoader"
import colors from "../constants/colors"
import { ErrorToast, SuccessToast } from "../utils/ToastUtils"
import { isIos } from '../utils/MiscUtils'
import RootWithoutScoll from "../components/RootWithoutScroll"
import { useDispatch, useSelector } from "react-redux"
import { deleteReminder, getReminders } from "../store/actions/remindersActions"
import { updateProfile } from "../store/actions/authActions"

import { Reminder } from "../types"
import { User } from "../types"
import ListHeader from "../components/ListHeader"
import ListItem from "../components/ListItem"
import appContants from "../constants/appContants"
import { promiseAlertHandler } from "../utils/AlertHandler"

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: colors.globalBg,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: "center",
}

const LIST_CONTAINER_STYLE: ViewStyle = {
  paddingBottom: 20,
  minHeight: "100%",
}

type EmptyViewProps = {
  style?: ViewStyle, image?: ImageRequireSource, text?: string
}

const checkPropsEquality = (prevProps: EmptyViewProps, nextProps: EmptyViewProps) => {
  return prevProps.image !== nextProps.image && prevProps.text !== nextProps.text
}

export const EmptyView = React.memo(function EmptyView(props: EmptyViewProps) {
  const { style, image, text } = props

  return (
    <View style={[CONTAINER, style]}>
      {
        // image && text
        //   ? <>
        //     <Image
        //       source={image}
        //       style={{ height: 200, width: 150 }}
        //       resizeMode="contain"
        //     />
        <BoldText style={{ marginTop: 20, fontSize: 18, maxWidth: "60%", alignSelf: 'center', textAlign: 'center' }} >{text}</BoldText>
        // </>
        // : <Image
        //   source={images.img_no_data_found}
        //   style={{ height: 200, width: 150 }}
        // />
      }
    </View>
  )
}, checkPropsEquality)

function HomeScreen(props: any) {
  const { navigation, route } = props

  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const dispatch = useDispatch()
  const { todaysData, upcomingData } = useSelector((state: any) => state.reminders)
  const userData: User = useSelector((state: any) => state.auth)

  const editReminderHandler = useCallback((reminderData: any) => {
    navigation.navigate('addReminder', {
      reminderData
    })
  }, [])

  const shareCardHandler = useCallback((cardDetails: any) => {
    navigation.navigate('shareCard', {
      cardDetails
    })
  }, [navigation])

  const deleteCardHandler = useCallback(async (cardDetails: any) => {
    try {
      const {
        event_date,
        rem_id,
      } = cardDetails
      const userConfirmation = await promiseAlertHandler(
        'Are you sure?',
        'You are about to delete reminder',
        [
          {
            buttonReturnValue: true,
            buttonText: 'OK',
            buttonType: 'destructive'
          },
          {
            buttonReturnValue: false,
            buttonText: 'CANCEL',
            buttonType: 'cancel'
          },
        ]
      )
      if (!userConfirmation) {
        return
      }
      setIsLoading(true)
      await dispatch(deleteReminder(rem_id, event_date))
      setIsLoading(false)
      SuccessToast('Deleted Successfully.')
    } catch (err: any) {
      console.log('Error : ', err?.message ?? appContants.SOMETHING_WENT_WRONG)
      ErrorToast(err?.message ?? appContants.SOMETHING_WENT_WRONG)
      setIsLoading(false)
    }
  }, [])

  const renderItemHandler = useCallback(({ item, index }) => {
    try {
      const reminderData: Reminder = item
      const {
        rem_name,
        event_date,
        event_type,
      } = reminderData

      return (
        <ListItem
          key={index}
          text={rem_name}
          eventDate={event_date}
          eventType={event_type}
          onPress={editReminderHandler.bind(null, item)}
          onShare={shareCardHandler.bind(null, item)}
          onDelete={deleteCardHandler.bind(null, item)}
        />
      )
    } catch (err: any) {
      console.log('Error : ', err.message)
      return null
    }
  }, [editReminderHandler, deleteCardHandler, shareCardHandler])

  const getUserGoalsHandler = useCallback(async (refresh = false) => {
    try {
      if (refresh) {
        setIsRefreshing(true)
      } else {
        setIsLoading(true)
      }
      await dispatch(getReminders())
      if (refresh) {
        setIsRefreshing(false)
      } else {
        setIsLoading(false)
      }
    } catch (err: any) {
      ErrorToast(err.message)
      console.log('[getUserGoalsHandler] Error : ', err.message)
    } finally {
      if (refresh) {
        setIsRefreshing(false)
      } else {
        setIsLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    getUserGoalsHandler()
  }, [getUserGoalsHandler])

  useEffect(() => {

    const updateUserProfile = async () => {

      const token = await await messaging().getToken()

      await dispatch(updateProfile({
        nottoken: token,
        logged_in: userData.u_id,
      }))
    }

    updateUserProfile();

  }, [])

  const renderTodayHeaderHandler = useCallback(() => {
    return (
      <ListHeader
        text="Today"
      />
    )
  }, [])

  const renderAllUserHeaderHandler = useCallback(() => {
    return (
      <>
        <FlatList
          data={todaysData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItemHandler}
          contentContainerStyle={{
            paddingBottom: 20,
            minHeight: "100%",
          }}
          showsVerticalScrollIndicator={false}
          onRefresh={getUserGoalsHandler.bind(null, true)}
          refreshing={isRefreshing}
          ListHeaderComponent={todaysData?.length ? renderTodayHeaderHandler : null}
          stickyHeaderIndices={[0]}
        />
        <ListHeader
          text="All Users"
        />
      </>
    )
  }, [todaysData, renderItemHandler])

  const keyExtractorHandler = useCallback((_, index) => index.toString(), [])

  return (
    <RootWithoutScoll style={{ ...ROOT }}>
      <StatusBar
        backgroundColor={colors.primary}
        barStyle={!isIos ? "light-content" : "dark-content"}
      />
      <AppLoader isVisible={isLoading} />
      {
        !isLoading && !isRefreshing && (!todaysData || !todaysData?.length) && (!upcomingData || !upcomingData?.length)
          ?
          <EmptyView
            // image={images.img_no_data_found}
            text={`You have not added any reminder yet!\n\nClick the “Add” tab to get started`}
          />
          : (
            <FlatList
              data={upcomingData}
              keyExtractor={keyExtractorHandler}
              renderItem={renderItemHandler}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={LIST_CONTAINER_STYLE}
              onRefresh={getUserGoalsHandler.bind(null, true)}
              refreshing={isRefreshing}
              ListHeaderComponent={renderAllUserHeaderHandler}
            />
          )
      }

      <AdmobBannerAd />
    </RootWithoutScoll>
  )
}

export default HomeScreen;

