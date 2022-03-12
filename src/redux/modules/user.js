import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import instance from '../../shared/Request';
import { LoginWithKakao, logoutWithKakao } from '../../components/KakaoLogin';
import axios from 'axios';
import { Buffer } from 'buffer';
import jwt_decode from 'jwt-decode';

const GET_NICKNAME = 'GET_NICKNAME';
const SET_WEEKLY_GOAL = 'SET_WEEKLY_GOAL';
const GET_RANKING = 'GET_RANKING';

const getNickname = createAction(GET_NICKNAME, (nickname) => ({ nickname }));
const setWeeklyGoal = createAction(SET_WEEKLY_GOAL, (selectGoal) => ({ selectGoal }));
const getRanking = createAction(GET_RANKING, (ranking) => ({ ranking }));

const initialState = {
  nickname: 'User의 Initial값',
  ranking: [
    {
      rank: 1,
      nickName: '가슴이 득근득근',
      countPerWeek: 13,
      isMe: false,
    },
    {
      rank: 2,
      nickName: '일어나 하체해야지',
      countPerWeek: 11,
      isMe: false,
    },
    {
      rank: 3,
      nickName: '쏘맥먹고싶어요',
      countPerWeek: 10,
      isMe: false,
    },
    {
      rank: 4,
      nickName: '한세트만 더',
      countPerWeek: 8,
      isMe: false,
    },
    {
      rank: 9,
      nickName: '먹은만큼 운동하자',
      countPerWeek: 5,
      isMe: true,
    },
  ].sort(),
};

const userInfoChangeFB = (nickname, selectGoal) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem('isLogin');
    axios
      .patch(
        'http://3.39.58.56:4000/users',
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
        const myToken = jwt_decode(access_token);

        dispatch(getNickname(nickname));
        dispatch(setWeeklyGoal(selectGoal + 1));
        // 토큰값 업데이트를 위한 로그아웃 후 재로그인
        localStorage.removeItem('isLogin');
        axios
          .post('http://3.39.58.56:4000/users/auth', {
            nickName: nickname,
            snsId: myToken.id,
          })
          .then((res) => {
            dispatch(getNickname(myToken.nickName));
            window.alert('회원 정보가 변경되었습니다');
          })
          .catch((error) => {
            alert('카카오 로그인 에러', error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

const getRankFB = (ranking) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem('isLogin');
    axios
      .get('http://3.39.58.56:4000/myinfo/ranking', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        dispatch(getRanking(res.data.ranking));
        console.log(res);
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
