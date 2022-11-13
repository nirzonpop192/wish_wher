export interface User {
  u_id: string;
  u_fullname: string;
  user_name: string;
  u_email: string;
  u_password: string;
  u_otp: any;
  u_contact: string;
  u_added_when: any;
  status: string;
  profile_pic: string;
  nottoken: string;
  timezonez: string;
}

export interface Reminder {
  rem_id: string;
  celeb_picture: string;
  rem_name: string;
  email: string;
  whatsapp: string;
  event_type: string;
  event_date: string;
  message: string;
  by_user: string;
  card_id: string;
}

export interface ReduxAction {
  type: string;
  payload: any;
}

export interface CommonApiRes {
  status: boolean;
  message: string;
}

export interface CommonApiResWithData<T> extends CommonApiRes {
  data: T;
}

export type AddReminderReq = {
  fullname: string;
  email: string;
  phone: string;
  event_type: 'Bir' | 'Anni';
  event_date: string;
  message: string;
  logged_in: number;
  image_data: string;
  card_id: string;
};

export type ReminderReducer = {
  todaysData: Reminder[];
  upcomingData: Reminder[];
  allData: Reminder[];
};
