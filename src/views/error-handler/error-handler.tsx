import { useEffect } from "react"
import { Alert, ToastAndroid } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { getErrorMessage, hideErrorAction } from "@github/state"
import { Platform } from "@github/utils"
import { R } from "@github/res"

const ErrorHandler = () => {
  const message = useSelector(getErrorMessage)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!message) {
      return
    }

    if (Platform.isAndroid) {
      ToastAndroid.show(message, ToastAndroid.SHORT)
    } else if (Platform.isIOS) {
      Alert.alert(R.string.shared.errorTitle, message)
    }
    dispatch(hideErrorAction())
  }, [message, dispatch])

  return null
}

export default ErrorHandler
