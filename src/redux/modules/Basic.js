import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

// import axios from "axios"
const GET_POST = "SET_POST";

const getPost = createAction(GET_POST, (postList) => ({
  postList,
}));

const initialState = {
  list: [],
};

const getPostDB = (category) => {
  return function (dispatch, getState, { history }) {
    instance
      .get("/post")
      .then((response) => {
        dispatch(getPost(response.data.posts));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.postList;
      }),
  },
  initialState
);

const actionCreators = {
  getPostDB,
};
export { actionCreators };
