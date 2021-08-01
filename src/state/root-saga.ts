import { all, call } from "redux-saga/effects"
import { searchSubscription, sharedSubscription } from "./ducks"

export default function* rootSaga() {
  yield all([call(sharedSubscription), call(searchSubscription)])
}
