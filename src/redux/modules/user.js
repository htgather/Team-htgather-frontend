import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

import axios from "axios";
import { actionCreators as commonActions } from "./common";
const GET_NICKNAME = "GET_NICKNAME";
const SET_WEEKLY_GOAL = "SET_WEEKLY_GOAL";

const getNickname = createAction(GET_NICKNAME, (nickname) => ({ nickname }));
const setWeeklyGoal = createAction(SET_WEEKLY_GOAL, (selectGoal) => ({
  selectGoal,
}));

const initialState = {
  nickname: "",
};

const userInfoChangeFB = (nickname, selectGoal) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("isLogin");
    axios
      .patch(
        "https://test.kimjeongho-server.com/users",
        {
          nickName: nickname,
          weeklyGoal: selectGoal + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((response) => {
        localStorage.removeItem("isLogin");
        localStorage.setItem("isLogin", response.data.token);
        // const myToken = jwt_decode(access_token);
        dispatch(getNickname(nickname));
        dispatch(setWeeklyGoal(selectGoal + 1));
        dispatch(commonActions.setRecords(selectGoal + 1));
        window.alert("회원 정보가 변경되었습니다");
      });
  };
};

export default handleActions(
  {
    [GET_NICKNAME]: (state, action) =>
      produce(state, (draft) => {
        draft.nickname = action.payload.nickname;
      }),
    [SET_WEEKLY_GOAL]: (state, action) =>
      produce(state, (draft) => {
        draft.selectGoal = action.payload.selectGoal;
      }),
  },
  initialState
);

const actionCreators = {
  getNickname,
  userInfoChangeFB,
};

export { actionCreators };
