import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";
import axios from "axios";

const GET_CALENDAR = "GET_CALENDAR";
const GET_RECORDS = "GET_RECORDS";
const SET_RECORDS = "SET_RECORDS";

const getCalendar = createAction(GET_CALENDAR, (calenderList) => ({
  calenderList,
}));
const getRecords = createAction(GET_RECORDS, (records) => ({
  records,
}));
const setRecords = createAction(SET_RECORDS, (weeklyGoal) => ({
  weeklyGoal,
}));

const initialState = {
  list: {},
  myRecords: [],
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
    axios
      .get("https://test.kimjeongho-server.com/myinfo/statistics", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("isLogin")}`,
        },
      })
      .then((response) => {
        dispatch(getRecords(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const saveRecordsDB = (recordsData) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/myinfo/records`, recordsData)
      .then((response) => {
        // alert(response.data.message);
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
    [SET_RECORDS]: (state, action) =>
      produce(state, (draft) => {
        draft.myRecords = {
          ...draft.myRecords,
          weeklyGoal: action.payload.weeklyGoal,
        };
      }),
  },
  initialState
);

const actionCreators = {
  getCalendarDB,
  getRecordsDB,
  setRecords,
  saveRecordsDB,
};

export { actionCreators };
