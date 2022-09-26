export const initialState = {
  // 초기 데이터값

  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
export const FALLOW_REQUEST = "FALLOW_REQUEST";
export const FALLOW_SUCCESS = "FALLOW_SUCCESS";
export const FALLOW_FAILURE = "FALLOW_FAILURE";
export const UNFALLOW_REQUEST = "UNFALLOW_REQUEST";
export const UNFALLOW_SUCCESS = "UNFALLOW_SUCCESS";
export const UNFALLOW_FAILURE = "UNFALLOW_FAILURE";

const dummyUser = (data) => ({
  ...data,
  nickname: "tj",
  id: 1,
  Posts: [],
  Followings: [],
  Followers: [],
});

export const loginRequestAction = (data) => {
  // 함수는 컴포넌트에서 불러와야 하니 export를 붙여준다
  return {
    type: LOG_IN_REQUEST,
    // 데이터를 받아온 후 로그인 정보가 맞는지 확인.
    data,
  };
};

export const logoutRequestAction = (data) => {
  return {
    type: LOG_OUT_REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLodaing: true,
        logInError: null,
        logInDone: false,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLodaing: false,
        logInDone: true,
        me: dummyUser(action.data),
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };

    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutError: null,
        logOutDone: false,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: false,
        logOutError: action.error,
      };

    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUploading: true,
        signUpError: null,
        signUpDone: false,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: false,
        signUpError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
