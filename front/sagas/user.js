import { all, delay, fork, put, takeEvery } from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
} from '../reducers/user';

function logInAPI(data) {
  return axios.post('/api/login', data);
}
function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data); // call은 동기 fork는 비동기
    yield delay(1000);
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: LOG_IN_SUCCESS,
      data: action.data,
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/api/logout');
}
function* logOut() {
  try {
    // const result = yield call(logOutAPI); // call은 동기 fork는 비동기
    yield delay(1000);
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: LOG_OUT_SUCCESS,
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI() {
  return axios.post('http://localhost:3005/user');
}
function* signUp() {
  try {
    const result = yield call(signUpAPI); // call은 동기 fork는 비동기

    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: SIGN_UP_SUCCESS,
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function followAPI(data) {
  return axios.post('/api/follow', data);
}
function* follow(action) {
  try {
    // const result = yield call(followAPI, action.data); // call은 동기 fork는 비동기
    yield delay(1000);
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: FOLLOW_SUCCESS,
      data: action.data,
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function unFollowAPI(data) {
  return axios.post('/api/unfollow', data);
}
function* unFollow(action) {
  try {
    // const result = yield call(unFollowAPI, action.data); // call은 동기 fork는 비동기
    yield delay(1000);
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: UNFOLLOW_SUCCESS,
      data: action.data,
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  // while take 문과 takeEvery는 같은 의미 하지만 while take는 동기 takeEvery는 비동기
  // takeLatest는 마지막 이벤트만 처리 ex) 클릭을 두번했을때 마지막클릭만 처리함  ///// 모든이벤트 중 마지막 이벤트만 처리하는게 아니라 동시에 로딩중인 이벤트 중 마지막 이벤트만 처리하는거임
  yield takeEvery(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}
function* watchFollow() {
  yield takeEvery(FOLLOW_REQUEST, follow);
}
function* watchUnFollow() {
  yield takeEvery(UNFOLLOW_REQUEST, unFollow);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnFollow),
  ]);
}
