import {
  all,
  call,
  delay,
  fork,
  put,
  takeEvery,
  takeLatest,
  throttle,
} from 'redux-saga/effects';
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
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,
  RETWEET_REQUEST,
} from '../reducers/post';

function retweetAPI(data) {
  return axios.post(`/post/${data}/retweet`, data);
}
function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RETWEET_FAILURE,
      error: err.response.data,
    });
  }
}
function uploadImagesAPI(data) {
  return axios.post('/post/images', data);
}
function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}
function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}
function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}
function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}
function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
}
function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.lastId); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: LOAD_POSTS_SUCCESS,
      data: result.data, // 게시글 10개 불러오기
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/post', data);
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
      error: err.response.data,
    });
  }
}
function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}
function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data); // call은 동기 fork는 비동기
    yield put({
      // put은 dispatch라고 생각하는게 편함
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
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
      error: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}
function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPosts),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchUploadImages),
    fork(watchRetweet),
  ]);
}
