export const changeState = (state) => ({
  type: "CHANGE_STATE",
  payload: { state }
});

export const changeCounter = (count) => ({
  type: "CHANGE_COUNTER",
  payload: { count }
});
export const incCounter = (cb) => ({
  type: "INC_COUNTER",
  payload: {
    cb
  }
});
