import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

const GET_CALENDAR = "GET_CALENDAR";

const getCalendar = createAction(GET_CALENDAR, (calenderList) => ({
  calenderList,
}));

const initialState = {
  list: {},
};

// 사용자의 운동날짜 기록 가져오기
const getCalendarDB = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/myinfo/calendar`)
      .then((response) => {
        dispatch(getCalendar(response.data.dates));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export default handleActions(
  {
    [GET_CALENDAR]: (state, action) =>
      produce(state, (draft) => {
        draft.calendarList = action.payload.calenderList;
      }),
  },
  initialState
);

const actionCreators = {
  getCalendarDB,
};

export { actionCreators };
