import moment from 'moment'
import { ReduxAction, Reminder, ReminderReducer } from '../../types'
import { createDeepCopy } from '../../utils/MiscUtils'
import { LOGOUT } from '../actions/authActions'
import * as reminderActions from '../actions/remindersActions'

const initialState: ReminderReducer = {
    todaysData: [],
    allData: [],
    upcomingData: []
}

export default (state = initialState, action: ReduxAction) => {
    const { type, payload } = action
    switch (type) {
        case reminderActions.GET_REMINDERS:
            // console.log('getReminders : ', payload)
            return { ...createDeepCopy(payload) }
        case reminderActions.ADD_REMINDER:
            const existStateData = createDeepCopy(state)
            const existingTodaysData = createDeepCopy(existStateData.todaysData)
            const existingUpcomingData = createDeepCopy(existStateData.upcomingData)
            const existingAllData = createDeepCopy(existStateData.allData)

            const todaysDate = moment().format("YYYY-MM-DD")
            if (payload.event_date === todaysDate) {
                existingTodaysData.push(payload)
            } else {
                existingUpcomingData.push(payload)
            }
            existingAllData.push(payload)
            return {
                todaysData: existingTodaysData,
                allData: existingAllData,
                upcomingData: existingUpcomingData
            }
        case reminderActions.UPDATE_REMINDER: {
            const {
                id,
                data
            } = payload

            const existStateData = createDeepCopy(state)
            let existingTodaysData = createDeepCopy(existStateData.todaysData)
            let existingUpcomingData = createDeepCopy(existStateData.upcomingData)
            let existingAllData = createDeepCopy(existStateData.allData)

            const todaysDate = moment().format("YYYY-MM-DD")
            if (data.event_date === todaysDate) {
                const updateIndInTodaysData = existingTodaysData.findIndex((reminder: Reminder) => +reminder.rem_id === id)
                if (updateIndInTodaysData > -1) {
                    existingTodaysData[updateIndInTodaysData] = data
                } else {
                    existingTodaysData.push(data)
                    existingUpcomingData = existingUpcomingData.filter((reminder: Reminder) => +reminder.rem_id !== id)
                }
            } else {
                const updateIndInUpcomingData = existingUpcomingData.findIndex((reminder: Reminder) => +reminder.rem_id === id)
                if (updateIndInUpcomingData > -1) {
                    existingUpcomingData[updateIndInUpcomingData] = data
                } else {
                    existingUpcomingData.push(data)
                    existingTodaysData = existingTodaysData.filter((reminder: Reminder) => +reminder.rem_id !== id)
                }
            }
            const updateIndInAllData = existingAllData.findIndex((reminder: Reminder) => +reminder.rem_id === id)
            if (updateIndInAllData > -1) {
                existingAllData[updateIndInAllData] = data
            }
            return {
                todaysData: existingTodaysData,
                allData: existingAllData,
                upcomingData: existingUpcomingData
            }
        }
        case reminderActions.DELETE_REMINDER: {
            const {
                id,
                reminderDate
            } = payload

            const existStateData = createDeepCopy(state)
            let existingTodaysData = createDeepCopy(existStateData.todaysData)
            let existingUpcomingData = createDeepCopy(existStateData.upcomingData)
            let existingAllData = createDeepCopy(existStateData.allData)

            const todaysDate = moment().format("YYYY-MM-DD")
            if (reminderDate === todaysDate) {
                existingTodaysData = existingTodaysData.filter((reminder: Reminder) => +reminder.rem_id !== +id)
            } else {
                existingUpcomingData = existingUpcomingData.filter((reminder: Reminder) => +reminder.rem_id !== +id)
            }
            existingAllData = existingAllData.filter((reminder: Reminder) => +reminder.rem_id !== +id)
            return {
                todaysData: existingTodaysData,
                allData: existingAllData,
                upcomingData: existingUpcomingData
            }
        }
        case LOGOUT:
            return initialState
        default:
            return state
    }
}