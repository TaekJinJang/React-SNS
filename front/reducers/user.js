export const initialState = {
  // 초기 데이터값 
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};
export const loginAction = (data) => {
  // 함수는 컴포넌트에서 불러와야 하니 export를 붙여준다
  return { // 데이터를 받아온 후 로그인 정보가 맞는지 확인.
    type: "LOG_IN",
    data,
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
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };

    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};

export default reducer;
