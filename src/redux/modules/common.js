import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";

const GET_CALENDAR = "GET_CALENDAR";
const GET_RECORDS = "GET_RECORDS";

const getCalendar = createAction(GET_CALENDAR, (calenderList) => ({
  calenderList,
}));
const getRecords = createAction(GET_RECORDS, (records) => ({
  records,
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

const getRecordsDB = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/myinfo/statistics`)
      .then((response) => {
        console.log(response.data);
        return;
        dispatch(getRecords(response.data));
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
    [GET_RECORDS]: (state, action) =>
      produce(state, (draft) => {
        draft.myRecords = action.payload.records;
      }),
  },
  initialState
);

const actionCreators = {
  getCalendarDB,
  getRecordsDB,
};

export { actionCreators };
