export const initialState = {
  // 초기 데이터값
  isLoggedIn: false,
  isLoggingIn: false, // 로그인 시도중 !!
  isLoggingOut: false, // 로그아웃 시도중 !!
  me: null,
  signUpData: {},
  loginData: {},
};
export const loginAction = (data) => {
  // 함수는 컴포넌트에서 불러와야 하니 export를 붙여준다
  return {
    // 데이터를 받아온 후 로그인 정보가 맞는지 확인.
    type: "LOG_IN",
    data,
  };
};
export const loginRequestAction = (data) => {
  return {
    type: "LOG_IN_REQUEST",
    data,
  };
};
export const loginSuccessAction = (data) => {
  return {
    type: "LOG_IN_SUCCESS",
    data,
  };
};
export const logoutAction = (data) => {
  return {
    type: "LOG_OUT",
    data,
  };
};
export const logoutRequestAction = (data) => {
  return {
    type: "LOG_OUT_REQUEST",
    data,
  };
};
export const logoutSuccessAction = (data) => {
  return {
    type: "LOG_OUT_SUCCESS",
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_REQUEST":
      return {
        ...state,
        isLoggingIn: true,
      };
    case "LOG_IN_SUCCESS":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: "tk" },
      };
    case "LOG_IN_FAILURE":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      };

    case "LOG_OUT_REQUEST":
      return {
        ...state,
        isLoggingOut: true,
      };
    case "LOG_OUT_SUCCESS":
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: true,
      };
    case "LOG_OUT_FAILURE":
      return {
        ...state,
        isLoggingOut: false,
      };
    default:
      return state;
  }
};

export default reducer;
