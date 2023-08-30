import { combineReducers } from "redux";

const COUNTER_STATE = {
  IDLE: "IDLE",
  PROGRESS: "PROGRESS",
  RESET: "RESET",
  PAUSE: "PAUSE"
};

const Counter = {
  counter: 0,
  counterState: COUNTER_STATE.IDLE
};

const changeCounterProp = (state = Counter, { type, payload }) => {
  switch (type) {
    case "CHANGE_STATE":
      return { ...state, counterState: payload.state };
    case "INC_COUNTER":
      const { counter } = state;
      const { cb } = payload;
      let newCounter = counter;
      if (typeof cb === "function") {
        newCounter = cb(counter);
      }
      return { ...state, counter: newCounter };
    case "CHANGE_COUNTER":
      return { ...state, counter: payload.count };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ changeCounterProp });

export default rootReducer;
