import { all, call } from "redux-saga/effects"
import { sharedSubscription } from "./ducks"

export default function* rootSaga() {
  yield all([call(sharedSubscription)])
}
