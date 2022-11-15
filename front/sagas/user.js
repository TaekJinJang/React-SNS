import {
  all,
  delay,
  fork,
  put,
  takeEvery,
  call,
  takeLatest,
} from 'redux-saga/effects';
import axios from 'axios';
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
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../reducers/user';

function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', { nickname: data });
}
function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}
function loadMyInfoAPI() {
  return axios.get('/user');
}
function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function loadFollowersAPI(data) {
  return axios.get(`/user/followers`, data);
}
function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: err.response.data,
    });
  }
}
function loadFollowingsAPI(data) {
  return axios.get(`/user/followings`, data);
}
function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadUserAPI(data) {
  return axios.get(`/user/${data}`);
}
function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}
function logInAPI(data) {
  return axios.post('/user/login', data);
}
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/user/logout');
}
function* logOut() {
  try {
    yield call(logOutAPI); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI(data) {
  return axios.post('/user', data);
}
function* signUp(action) {
  try {
    console.log(action.data);
    const result = yield call(signUpAPI, action.data); // call은 동기 fork는 비동기
    console.log(result);
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: SIGN_UP_SUCCESS,
      // data: result.action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function followAPI(data) {
  return axios.patch(`/user/${data}/follow`, data);
}
function* follow(action) {
  try {
    const result = yield call(followAPI, action.data); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function unFollowAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}
function* unFollow(action) {
  try {
    const result = yield call(unFollowAPI, action.data); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`);
}
function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  // while take 문과 takeEvery는 같은 의미 하지만 while take는 동기 takeEvery는 비동기
  // takeLatest는 마지막 이벤트만 처리 ex) 클릭을 두번했을때 마지막클릭만 처리함  ///// 모든이벤트 중 마지막 이벤트만 처리하는게 아니라 동시에 로딩중인 이벤트 중 마지막 이벤트만 처리하는거임
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unFollow);
}
function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}
function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLoadFollowings),
    fork(watchLoadFollowers),
    fork(watchRemoveFollower),
    fork(watchLoadMyInfo),
    fork(watchChangeNickname),
    fork(watchLoadUser),
  ]);
}
