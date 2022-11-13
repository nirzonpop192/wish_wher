import axios from "axios";
import appContants from "./constants/appContants";

axios.defaults.baseURL = appContants.BASE_URL

axios.defaults.headers.common = {
    Authorization: "Basic YWRtaW46MTIzNA==",
    "X-API-KEY": "CODEX@123"
}

axios.defaults.timeout = 60000

// axios.interceptors.request.use(function (config) {

//     // console.log('config : ', JSON.stringify(config))

//     // Do something before request is sent
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

// const instance = axios.create({
//   baseURL: appContants.BASE_URL,
//   timeout: 30000,
//   headers: {
//     Authorization: "Basic YWRtaW46MTIzNA==",
//     "X-API-KEY": "CODEX@123"
//   }
// });


export default axios
