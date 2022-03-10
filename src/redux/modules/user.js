import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import instance from '../../shared/Request';
import { LoginWithKakao, logoutWithKakao } from '../../components/KakaoLogin';
import axios from 'axios';
import { Buffer } from 'buffer';

const GET_NICKNAME = 'GET_NICKNAME';
const SET_NICKNAME = 'SET_NICKNAME';

const getNickname = createAction(GET_NICKNAME, (nickname) => ({ nickname }));
const setNickname = createAction(SET_NICKNAME, (nickname) => ({ nickname }));

const initialState = {
  // nickname: '',
  nickname: 'User의 Initial값',
};

const nickChangeFB = (nickname) => {
  return function (dispatch, getState, { history }) {
    axios
      .patch(
        'http://3.39.58.56:4000/users',
        {
          nickName: nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('isLogin')}`,
          },
        }
      )
      .then((response) => {
        // window.alert('changeFB 성공' + nickname);
        const accessToken = localStorage.getItem('isLogin');
        const base64payload = accessToken.split('.')[1];
        const payload = Buffer.from(base64payload, 'base64');
        const result = JSON.parse(payload.toString());
        console.log('user.js의 token복호화 결과', result);
        const _nickname = result.nickNaㅋme;

        dispatch(getNickname(nickname));
        // 토큰값 업데이트를 위한 로그아웃 후 재로그인
        localStorage.removeItem('isLogin');
        // localStorage.clear();
        // LoginWithKakao();

        axios
          .post('http://3.39.58.56:4000/users/auth', {
            nickName: nickname,
            snsId: result.id,
          })
          .then((res) => {
            console.log(res);
            console.log('두번째 axios성공', res); //직전에 변경한 닉네임 config에 있음
            localStorage.setItem('isLogin', res.data.token);
            const base64payload = localStorage.getItem('isLogin').split('.')[1];
            const payload = Buffer.from(base64payload, 'base64');
            const result = JSON.parse(payload.toString());
            console.log('두번째 axios성 token복호화 결과', result);
            const _nickname = result.nickName;
            dispatch(getNickname(_nickname));
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

export default handleActions(
  {
    [GET_NICKNAME]: (state, action) =>
      produce(state, (draft) => {
        draft.nickname = action.payload.nickname;
        // console.log(action.payload.nickname); //찍힘
      }),
  },
  initialState
);

const actionCreators = {
  getNickname,
  nickChangeFB,
};

export { actionCreators };
