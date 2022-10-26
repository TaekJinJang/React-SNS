import { all, call, delay, fork, put, takeEvery } from 'redux-saga/effects';
import shortId from 'shortid';
import axios from 'axios';
import {
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_POST_TO_ME,
  REMOVE_POST_REQUEST,
  REMOVE_POST_FAILURE,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_OF_ME,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
} from '../reducers/post';

function loadPostsAPI(data) {
  return axios.get('/posts', data);
}
function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: LOAD_POSTS_SUCCESS,
      data: result.data, // 게시글 10개 불러오기
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/post', { content: data });
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}
function removePostAPI(data) {
  return axios.delete('/api/post', data);
}
function* removePost(action) {
  try {
    // const result = yield call(removePostAPI, action.data); // call은 동기 fork는 비동기
    yield delay(1000);
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: REMOVE_POST_SUCCESS,
      data: action.data,

      //   data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}
function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}
function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield takeEvery(LOAD_POSTS_REQUEST, loadPosts);
}
function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
  yield takeEvery(REMOVE_POST_REQUEST, removePost);
}
function* watchAddComment() {
  yield takeEvery(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPosts),
  ]);
}
