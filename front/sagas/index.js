import {
  all,
  fork,
  put,
  take,
  call,
  takeEvery,
  delay,
} from "redux-saga/effects";
import axios from "axios";
import postSaga from "./post";
import userSaga from "./user";

export default function* rootSaga() {
  // 제너레이터 함수 알아보기
  yield all([fork(postSaga), fork(userSaga)]);
}
