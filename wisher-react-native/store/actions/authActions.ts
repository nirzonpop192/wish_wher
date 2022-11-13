import axios from "../../axios.auth";
import { AxiosError, AxiosResponse } from "axios"
import { User, CommonApiResWithData, CommonApiRes } from '../../types'
import { createFormData } from "../../utils/MiscUtils";
import appContants from "../../constants/appContants";
import qs from 'qs'

export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const FORGOT = "FORGOT";
export const LOGOUT = "LOGOUT";

export type LoginRequest = {
    email: string,
    password: string,
    token?: string
}

export const login = (loginReq: LoginRequest) => {
    return async (dispatch: any, getState: any) => {
        try {
            const loginRes: AxiosResponse<CommonApiResWithData<User>> = await axios({
                url: 'authentication/login',
                method: "POST",
                data: loginReq
            })

            if (loginRes.data.status) {
                dispatch({
                    type: LOGIN,
                    payload: loginRes.data.data
                })
            }
            return loginRes.data
        } catch (err: any | AxiosError<CommonApiRes>) {
            console.log(err?.response?.data?.message ?? err?.message)
            throw new Error(err?.response?.data?.message ?? appContants.SOMETHING_WENT_WRONG)
        }
    }
}

export type SignupRequest = {
    fullname: string,
    email: string,
    password: string,
    phone: string,
    token?: string,
    timezone?: string
}

export const signup = (signupReq: SignupRequest) => {
    return async (dispatch: any, getState: any) => {
        try {
            const signupRes: AxiosResponse<CommonApiResWithData<User>> = await axios({
                url: 'authentication/registration',
                method: "POST",
                data: signupReq
            })

            if (signupRes.data.status) {
                dispatch({
                    type: SIGNUP,
                    payload: signupRes.data.data
                })
            }
            return signupRes.data
        } catch (err: any | AxiosError<CommonApiRes>) {
            throw new Error(err?.response?.data?.message ?? appContants.SOMETHING_WENT_WRONG)
        }
    }
}

type UpdateProfileRequest = {
    fullname?: string,
    email?: string,
    phone?: string
    filepic?: string
    logged_in?: string,
    timezone?: string,
    nottoken?: string,
}

export const updateProfile = (updateProfileReq: UpdateProfileRequest) => {
    return async (dispatch: any, getState: any) => {
        try {
            const data = createFormData('filepic', updateProfileReq)

            console.log('data : ', data)

            const res = await fetch(
                `${appContants.BASE_URL}/authentication/updateprofile`,
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
                    const getProfileRes: AxiosResponse<CommonApiResWithData<User[]>> = await axios({
                        url: `authentication/getprofile/${updateProfileReq.logged_in}`,
                        method: 'GET'
                    })
                    console.log(getProfileRes.data)
                    if (getProfileRes.data.status) {
                        dispatch({
                            type: UPDATE_PROFILE,
                            payload: getProfileRes.data.data[0]
                        })
                    } else {
                        throw new Error(appContants.SOMETHING_WENT_WRONG)
                    }
                } catch (err: AxiosError<any, any> | any) {
                    throw new Error(err?.response?.data?.message ?? appContants.SOMETHING_WENT_WRONG)
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

export const logout = (userId: any) => {
    return async (dispatch: any, getState: any) => {
        try {
            await axios({
                url: `authentication/logout/${userId}`,
                method: 'POST'
            })
        } catch (err: any | AxiosError<CommonApiRes>) {
            throw new Error(err?.response?.data?.message ?? appContants.SOMETHING_WENT_WRONG)
        } finally {
            dispatch({
                type: LOGOUT,
            })
        }
    }
}

export const deleteAccount = (userId: any) => {
    return async (dispatch: any, getState: any) => {
        try {
            await axios({
                url: `authentication/remove_user/${userId}`,
                method: 'DELETE'
            })
        } catch (err: any | AxiosError<CommonApiRes>) {
            throw new Error(err?.response?.data?.message ?? appContants.SOMETHING_WENT_WRONG)
        } finally {
            dispatch({
                type: LOGOUT,
            })
        }
    }
}

export const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
    try {
        const changePasswordRes: AxiosResponse<CommonApiRes> = await axios({
            url: `authentication/update_password/${userId}`,
            method: "POST",
            data: qs.stringify({
                oldpassword: oldPassword,
                onewpassword: newPassword
            })
        })
        return changePasswordRes
    } catch (err: any) {
        console.log('[changePassword] Error : ', err.message)
        throw new Error(appContants.SOMETHING_WENT_WRONG)
    }
}

export const forgotPassword = async (email: string) => {
    try {
        const resetPasswordRes: AxiosResponse<CommonApiRes> = await axios({
            url: `authentication/reset_password/`,
            method: "POST",
            data: qs.stringify({
                email,
            })
        })
        return resetPasswordRes
    } catch (err: any) {
        console.log('[forgotPassword] Error : ', err.message)
        throw new Error(appContants.SOMETHING_WENT_WRONG)
    }
}