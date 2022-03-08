import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import instance from '../../shared/Request';

import axios from 'axios';
import { Buffer } from 'buffer';

const GET_NICKNAME = 'GET_NICKNAME';

const getNickname = createAction(GET_NICKNAME, (nickname) => ({ nickname }));

const initialState = {
  nickname: 'User의 Initial값',
};

const nickChangeFB = (nickname) => {
  return function (dispatch, getState, { history }) {
    const base64payload = localStorage.getItem('isLogin').split('.')[1];
    // console.log(base64payload);
    const payload = Buffer.from(base64payload, 'base64');
    // console.log(payload);
    const result = JSON.parse(payload.toString());
    console.log('결과다~~~~!!!!!', result);
    // console.log(result.nickName);
    const _nickname = result.nickName;
    console.log('token 닉네임', _nickname);
    console.log('nickname', nickname);

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
        console.log(response);
        const obj = JSON.parse(response.config.data);
        console.log(obj.nickName);
        // dispatch(getNickname(response.data.nickname));
        dispatch(getNickname(obj.nickName));
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
      }),
  },
  initialState
);

const actionCreators = {
  getNickname,
  nickChangeFB,
};

export { actionCreators };
