import { all, delay, fork, put, takeEvery } from "redux-saga/effects";
import {
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
} from "../reducers/post";

function addPostAPI(data) {
  return axios.post("/api/post", data);
}
function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data); // call은 동기 fork는 비동기
    yield delay(1000);
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: ADD_POST_SUCCESS,
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}
function addCommentAPI(data) {
  return axios.post("/api/post/${data/postId}/comment", data);
}
function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data); // call은 동기 fork는 비동기
    yield delay(1000);
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: ADD_COMMENT_SUCCESS,
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}
function* watchAddComment() {
  yield takeEvery(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
