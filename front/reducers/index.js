import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';

// const initialState = {
//   user: {},
//   post: {},
// };

// 리듀서를 쉽게 설명하면 (이전상태, 액션) => 다음상태
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      // console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
