import { AxiosError, AxiosResponse } from "axios"
import moment from "moment";

import axios from "../../axios.auth";
import appContants from "../../constants/appContants";
import { AddReminderReq, CommonApiRes, CommonApiResWithData, Reminder, User } from '../../types'
import { createFormData, isIos } from "../../utils/MiscUtils";

export const GET_REMINDERS = "GET_REMINDERS"

export const getReminders = () => {
    return async (dispatch: any, getState: any) => {

        const { auth }: { auth: User } = getState((state: any) => state)

        let remindersData: Reminder[] = []
        let todaysData: Reminder[] = []
        let remainingData: Reminder[] = []

        try {
            const getRemindersRes: AxiosResponse<CommonApiResWithData<Reminder[]>> = await axios({
                url: `authentication/get_reminders/${auth.u_id}`,
                method: 'GET'
            })
            if (getRemindersRes.data.status) {
                remindersData = getRemindersRes.data.data

                const todaysDate = moment().format("YYYY-MM-DD")
                remindersData.forEach((reminder: Reminder) => {
                    if (reminder.event_date === todaysDate) {
                        todaysData.push(reminder)
                    } else {
                        remainingData.push(reminder)
                    }
                })
                dispatch({
                    type: GET_REMINDERS,
                    payload: {
                        todaysData: todaysData,
                        allData: remindersData,
                        upcomingData: remainingData
                    }
                })
            } else {
                dispatch({
                    type: GET_REMINDERS,
                    payload: {
                        todaysData: [],
                        allData: [],
                        upcomingData: []
                    }
                })
            }
        } catch (err: AxiosError<any, any> | any) {
            console.log('Error : ', JSON.stringify(err?.response?.data))
            dispatch({
                type: GET_REMINDERS,
                payload: {
                    todaysData: [],
                    allData: [],
                    upcomingData: []
                }
            })
            throw new Error(err?.response?.data?.message ?? err?.message ?? appContants.SOMETHING_WENT_WRONG)
        }
    }
}

export const ADD_REMINDER = "ADD_REMINDER"

export const addReminder = (addReminderObj: AddReminderReq) => {
    return async (dispatch: any, getState: any) => {
        try {
            const data = createFormData('image_data', addReminderObj)
            console.log('call add api')

            const res = await fetch(
                `${appContants.BASE_URL}/authentication/addreminder/${addReminderObj.logged_in}`,
                {
                    method: 'post',
                    body: data,
                    headers: {
                        Authorization: "Basic YWRtaW46MTIzNA==",
                        "X-API-KEY": "CODEX@123",
                        'Content-Type': 'multipart/form-data'
                    },
                }
            )

            // const textData = await res.text();
            // console.log("textData", textData)

            const jsonData: CommonApiResWithData<number> = await res.json()
            // console.log('jsonData : ', jsonData)

            if (jsonData && jsonData.status) {
                try {
                    const getReminderRes: AxiosResponse<CommonApiResWithData<Reminder[]>> = await axios({
                        url: `authentication/get_reminderbyid/${jsonData.data}`,
                        method: 'GET'
                    })
                    console.log(getReminderRes.data)
                    if (getReminderRes.data.status) {
                        dispatch({
                            type: ADD_REMINDER,
                            payload: getReminderRes.data.data[0]
                        })
                    } else {
                        throw new Error(appContants.SOMETHING_WENT_WRONG)
                    }
                } catch (err: AxiosError<any, any> | any) {
                    console.log(err?.response?.data ?? err?.message)
                    // console.log(err.message)
                    throw new Error((err?.response?.data ?? err?.message) || appContants.SOMETHING_WENT_WRONG)
                }
            } else {
                if (jsonData) {
                    throw new Error(jsonData.message)
                } else {
                    throw new Error(appContants.SOMETHING_WENT_WRONG)
                }
            }

        } catch (err: any) {
            console.log(err?.message)
            throw new Error(err?.message || appContants.SOMETHING_WENT_WRONG)
        }
    }
}

export const UPDATE_REMINDER = "UPDATE_REMINDER"

export const updateReminder = (updateReminderObj: AddReminderReq, updateRemId: number) => {
    return async (dispatch: any, getState: any) => {
        try {
            const data = createFormData('image_data', updateReminderObj)

            const res = await fetch(
                `${appContants.BASE_URL}/authentication/updatedreminder/${updateRemId}`,
                {
                    method: 'post',
                    body: data,
                    headers: {
                        Authorization: "Basic YWRtaW46MTIzNA==",
                        "X-API-KEY": "CODEX@123",
                        'Content-Type': 'multipart/form-data'
                    },
                }
            )

            const jsonData: CommonApiResWithData<number> = await res.json()
            console.log('jsonData : ', jsonData)

            if (jsonData && jsonData.status) {
                try {
                    const getReminderRes: AxiosResponse<CommonApiResWithData<Reminder[]>> = await axios({
                        url: `authentication/get_reminderbyid/${updateRemId}`,
                        method: 'GET'
                    })
                    console.log(getReminderRes.data)
                    if (getReminderRes.data.status) {
                        dispatch({
                            type: UPDATE_REMINDER,
                            payload: {
                                id: updateRemId,
                                data: getReminderRes.data.data[0]
                            }
                        })
                    } else {
                        throw new Error(appContants.SOMETHING_WENT_WRONG)
                    }
                } catch (err: AxiosError<any, any> | any) {
                    console.log(err?.response?.data ?? err?.message)
                    // console.log(err.message)
                    throw new Error((err?.response?.data ?? err?.message) || appContants.SOMETHING_WENT_WRONG)
                }
            } else {
                if (jsonData) {
                    throw new Error(jsonData.message)
                } else {
                    throw new Error(appContants.SOMETHING_WENT_WRONG)
                }
            }
        } catch (err: any) {
            console.log(err?.message)
            throw new Error(/* err?.message || */appContants.SOMETHING_WENT_WRONG)
        }
    }
}

export const DELETE_REMINDER = "DELETE_REMINDER"

export const deleteReminder = (deleteRemId: string, reminderDate: string) => {
    return async (dispatch: any) => {
        try {
            const getReminderRes: AxiosResponse<CommonApiRes> = await axios({
                url: `authentication/delete_reminder/${deleteRemId}`,
                method: 'GET'
            })
            if (getReminderRes.data.status) {
                dispatch({
                    type: DELETE_REMINDER,
                    payload: {
                        id: deleteRemId,
                        reminderDate
                    }
                })
            } else {
                throw new Error(appContants.SOMETHING_WENT_WRONG)
            }
        } catch (err: AxiosError<any, any> | any) {
            console.log(err?.response?.data ?? err?.message)
            throw new Error((err?.response?.data ?? err?.message) || appContants.SOMETHING_WENT_WRONG)
        }
    }
}

export const getReminderHtml = async (reminderId: string) => {
    try {
        const apiCallRes: AxiosResponse<CommonApiResWithData<string>> = await axios({
            url: `authentication/makehtml/${reminderId}`,
            method: 'GET'
        })
        return apiCallRes
    } catch (err: any | AxiosError) {
        throw new Error(appContants.SOMETHING_WENT_WRONG)
    }
}