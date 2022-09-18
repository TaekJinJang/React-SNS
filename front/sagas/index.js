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

function logInAPI(data) {
  return axios.post("/api/login", data);
}
function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data); // call은 동기 fork는 비동기
    yield delay(1000);
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: "LOG_IN_SUCCESS",
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}
function* logOut() {
  try {
    // const result = yield call(logOutAPI); // call은 동기 fork는 비동기
    yield delay(1000);
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: "LOG_OUT_SUCCESS",
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post("/api/post", data);
}
function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data); // call은 동기 fork는 비동기
    yield delay(1000);
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: "ADD_POST_SUCCESS",
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogIn() {
  // while take 문과 takeEvery는 같은 의미 하지만 while take는 동기 takeEvery는 비동기
  // takeLatest는 마지막 이벤트만 처리 ex) 클릭을 두번했을때 마지막클릭만 처리함  ///// 모든이벤트 중 마지막 이벤트만 처리하는게 아니라 동시에 로딩중인 이벤트 중 마지막 이벤트만 처리하는거임
  yield takeEvery("LOG_IN_REQUEST", logIn);
}
function* watchLogOut() {
  yield takeEvery("LOG_OUT_REQUEST", logOut);
}
function* watchAddPost() {
  yield takeEvery("ADD_POST_REQUEST", addPost);
}

export default function* rootSaga() {
  // 제너레이터 함수 알아보기
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchAddPost)]);
}
