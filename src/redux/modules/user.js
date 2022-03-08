import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import instance from '../../shared/Request';

import axios from 'axios';

const GET_NICKNAME = 'GET_NICKNAME';

const getNickname = createAction(GET_NICKNAME, (nickname) => ({ nickname }));

const initialState = {
  nickname: '',
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
        window.alert('changeFB 성공' + nickname);
        console.log(response);
        dispatch(getNickname(response.data.nickname));
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
