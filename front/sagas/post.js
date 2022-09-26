import { all, delay, fork, put, takeEvery } from "redux-saga/effects";

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

function* watchAddPost() {
  yield takeEvery("ADD_POST_REQUEST", addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
