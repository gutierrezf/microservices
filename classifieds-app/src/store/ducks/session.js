// Actions
const SET = "session/SET";
const CLEAR = "session/CLEAR";

const defaultState = null;

// Reducers
const sessionReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET:
      return action.session;
    case CLEAR:
      return null;
  }

  return state;
};

export default sessionReducer;

// Action Creators
export const setSession = session => {
  return {
    type: SET,
    session
  };
};

export const clearSession = () => {
  return {
    type: CLEAR
  };
};
