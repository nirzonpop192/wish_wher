import moment from "moment";
import { Dimensions, Platform } from "react-native";
import appContants from "../constants/appContants";

export const isIos = Platform.OS === "ios"

export const { height, width } = Dimensions.get("window");

export const createFormData = (imageKey: string, body: any) => {
    const data = new FormData();

    Object.keys(body).forEach((key) => {
        if (key === imageKey) {
            if (!body[key].startsWith(appContants.BASE_IMAGE_URL)) {
                data.append(imageKey, {
                    name: "image.jpg",
                    type: "image/jpg",
                    uri: !isIos ? body[key] : body[key].replace('file://', ''),
                });
            }
        } else if (key === 'screenshot') {
            if (!body[key].startsWith(appContants.BASE_IMAGE_URL)) {
                data.append('screenshot', {
                    name: "image.jpg",
                    type: "image/jpg",
                    uri: !isIos ? body[key] : body[key].replace('file://', ''),
                });
            }
        } else {
            data.append(key, body[key]);
        }
    });

    return data;
};

export const convertDateToUnixFormat = (date: any) => moment(date, "YYYY-MM-DD").unix()

export const convertAPIToCalendarFormat = (date: any) => date // moment(date, "DD-MM-YYYY").format("YYYY-MM-DD")

export const convertUnixDateToAPIFormat = (date: any) => moment(date).format('YYYY-MM-DD')

export const createDeepCopy = (json: any) => JSON.parse(JSON.stringify(json))

export const delay = (miliseconds: number) => {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve(true)
        }, miliseconds)
    })
}