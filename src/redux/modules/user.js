import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { actionCreators as myinfoActions } from "./myinfo";

const GET_NICKNAME = "GET_NICKNAME";
const SET_WEEKLY_GOAL = "SET_WEEKLY_GOAL";
const GET_RANKING = "GET_RANKING";

const getNickname = createAction(GET_NICKNAME, (nickname) => ({ nickname }));
const setWeeklyGoal = createAction(SET_WEEKLY_GOAL, (selectGoal) => ({
  selectGoal,
}));
const getRanking = createAction(GET_RANKING, (ranking) => ({ ranking }));

const initialState = {
  nickname: "아자아자",
  ranking: [
    {
      rank: 1,
      nickName: "가슴이 득근득근",
      countPerWeek: 13,
      isMe: false,
    },
    {
      rank: 2,
      nickName: "일어나 하체해야지",
      countPerWeek: 11,
      isMe: false,
    },
    {
      rank: 3,
      nickName: "쏘맥먹고싶어요",
      countPerWeek: 10,
      isMe: false,
    },
    {
      rank: 4,
      nickName: "한세트만 더",
      countPerWeek: 8,
      isMe: false,
    },
    {
      rank: 126,
      nickName: "먹은만큼 운동하자",
      countPerWeek: 5,
      isMe: true,
    },
  ].sort(),
};

const userInfoChangeFB = (nickname, selectGoal) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("isLogin");
    axios
      .patch(
        "https://test.kimjeongho-server.com/users",
        {
          nickName: nickname,
          weeklyGoal: selectGoal,
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
        dispatch(getNickname(nickname));
        dispatch(setWeeklyGoal(selectGoal));
        dispatch(myinfoActions.setRecords(selectGoal));
        window.alert("회원 정보가 변경되었습니다");
      });
  };
};

const getRankFB = (ranking) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem("isLogin");
    axios
      .get("https://test.kimjeongho-server.com/myinfo/ranking", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        dispatch(getRanking(res.data.ranking));
      })
      .catch((err) => {
        console.log(err);
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
    [GET_RANKING]: (state, action) =>
      produce(state, (draft) => {
        draft.ranking = action.payload.ranking;
      }),
  },
  initialState
);

const actionCreators = {
  getNickname,
  getRanking,
  userInfoChangeFB,
  getRankFB,
};

export { actionCreators };
