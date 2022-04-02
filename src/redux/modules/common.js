import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SET_PLAYINFO = "SET_PLAYINFO";

const setPlayInfo = createAction(SET_PLAYINFO, (playInfo) => ({
  playInfo,
}));

const initialState = {
  playInfo: { curYoutubeTime: 0 },
};
//넘겨줄때 겍체로
export default handleActions(
  {
    [SET_PLAYINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.playInfo = { ...draft.playInfo, ...action.payload.playInfo };
      }),
  },
  initialState
);

const actionCreators = {
  setPlayInfo,
};

export { actionCreators };
