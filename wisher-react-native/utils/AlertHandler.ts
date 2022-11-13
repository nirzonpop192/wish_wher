import { Alert, Linking } from "react-native"

type buttonType = "destructive" | "cancel" | "default"

type buttonModel = {
  text: string
  style: buttonType
  onPress: () => any
}

const alertHandler = (title: string, message: string, buttons: buttonModel[]) => {
  Alert.alert(title, message, buttons)
}

type alertButtonModel = {
  buttonText: string
  buttonReturnValue: any
  buttonType: buttonType
}

// pass max 3 buttons for alert buttons..
const promiseAlertHandler = async (title: string, message: string, buttons: alertButtonModel[]) => {
  return new Promise((resolve) => {
    const buttonsArr: buttonModel[] = []

    buttons.map((button) => {
      buttonsArr.push({
        text: button.buttonText,
        onPress: () => {
          resolve(button.buttonReturnValue)
        },
        style: button.buttonType,
      })
    })
    alertHandler(title, message, buttonsArr)
  })
}

const openSettingsHandler = async () => {
  try {
    await Linking.openSettings()
  } catch (err) {
    console.log("[openSettingsHandler] Error : ", err.message)
  }
}

const openSettingsAlertWithDynamicLang = async (title, message, openSettingsText, cancelText) => {
  return new Promise((resolve, reject) => {
    try {
      alertHandler(
        title || 'Permission Required',
        message || `Please allow Permission(s) required by app from app settings to continue using this application`,
        [
          {
            text: openSettingsText || 'Open Settings',
            style: 'default',
            onPress: () => {
              openSettingsHandler()
              resolve(1)
            }
          },
          {
            text: cancelText || 'Cancel',
            style: 'cancel',
            onPress: () => {
              resolve(0)
            },
          },
        ],
      )
    } catch (err) {
      console.log('[openSettingsAlert] Error : ', err.message)
    }
  })
}

export { alertHandler, promiseAlertHandler, openSettingsHandler, openSettingsAlertWithDynamicLang }
