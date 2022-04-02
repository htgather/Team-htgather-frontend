import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import instance from "../../shared/Request";
import {
  _parserVideoId,
  _getVideoInfo,
} from "../../Components/Common/Functions/YoutubeDataAPI";
const GET_ROOM = "GET_ROOM";
const ADD_ROOM = "ADD_ROOM";

const GET_ENTERING_ROOM = "GET_ENTERING_ROOM";
const GET_SUGGESTIONS = "GET_SUGGESTIONS";

const getRoom = createAction(GET_ROOM, (roomList, searchIdxObj) => ({
  roomList,
  searchIdxObj,
}));
const addRoom = createAction(ADD_ROOM, (room) => ({
  room,
}));
const getSuggestions = createAction(GET_SUGGESTIONS, (suggestions) => ({
  suggestions,
}));
const initialState = {
  list: [],
  isStart: false,
  suggestions: [],
};

// 게시물 정보 불러오기 axios 요청 _ 카테고리가 있을 경우 그에 따라 다른 요청
const getRoomDB = (difficulty, category) => {
  const searchIndexObj = { difficulty, category };
  const difficultyList = ["전체", "낮음", "보통", "높음"];
  const categoryList = [
    "전체",
    "근력 운동",
    "유산소 운동",
    "스트레칭",
    "요가/필라테스",
    "기타",
  ];

  if (category && !difficulty) {
    // 카테고리만 있는 경우
    return function (dispatch, getState, { history }) {
      instance
        .get(`/rooms?category=${categoryList[category]}`)
        .then((response) => {
          dispatch(getRoom(response.data.rooms, searchIndexObj));
        })
        .catch((error) => {
          console.error(error);
        });
    };
  } else if (!category && difficulty) {
    // 난이도만 있는 경우
    return function (dispatch, getState, { history }) {
      instance
        .get(`/rooms?difficulty=${difficultyList[difficulty]}`)
        .then((response) => {
          dispatch(getRoom(response.data.rooms, searchIndexObj));
        })
        .catch((error) => {
          console.error(error);
        });
    };
  } else if (category && difficulty) {
    // 카테고리, 난이도 둘 다있는경우
    return function (dispatch, getState, { history }) {
      instance
        .get(
          `/rooms?category=${categoryList[category]}&difficulty=${difficultyList[difficulty]}`
        )
        .then((response) => {
          dispatch(getRoom(response.data.rooms, searchIndexObj));
        })
        .catch((error) => {
          console.error(error);
        });
    };
  } else {
    return function (dispatch, getState, { history }) {
      // 카테고리, 난이도 둘 다 없는 경우_ 전체불러오기
      instance
        .get("/rooms")
        .then((response) => {
          dispatch(getRoom(response.data.rooms, searchIndexObj));
        })
        .catch((error) => {
          console.error(error);
        });
    };
  }
};

// 방생성 axios 요청
const addRoomDB = (roomInfo) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/rooms", roomInfo)
      .then((response) => {
        dispatch(addRoom(response.data.roomInfo));
        history.push(`/room/${response.data.roomInfo.roomId}`);
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };
};

// 방입장 axios 요청
const joinRoomDB = (roomId) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/rooms/${roomId}`)
      .then((response) => {
        // dispatch(addRoom(response.data.roomInfo));
        history.push(`/room/${roomId}`);
      })
      .catch((error) => {
        // 카테고리 리스트에 맞춰서 다시 db요청
        const { difficulty, category } = getState().room.searchIdxObj;
        dispatch(getRoomDB(difficulty, category));
        window.alert(error.response.data.message);
      });
  };
};
// 방퇴장 axios 요청
const exitRoomDB = (roomId) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/rooms/exit/${roomId}`)
      .then((response) => {
        history.replace("/");
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };
};

// 영상추천목록 가져오기
const getSuggestionsDB = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get("https://test.kimjeongho-server.com/rooms/suggestions")
      .then((response) => {
        const suggestionsArray = [
          response.data["recentUrl"],
          ...response.data["bestUrls"],
        ].filter((i) => i.length !== 0);
        const suggestion = [];
        (async () => {
          for (let link of suggestionsArray) {
            const info = await _getVideoInfo(_parserVideoId(link));
            suggestion.push({ ...info, link });
          }
          dispatch(getSuggestions(suggestion));
        })();
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export default handleActions(
  {
    [GET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.roomList.reverse();
        draft.searchIdxObj = action.payload.searchIdxObj;
      }),
    [ADD_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.room);
      }),

    [GET_ENTERING_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.enteringList = action.payload.enteringList;
      }),

    [GET_SUGGESTIONS]: (state, action) =>
      produce(state, (draft) => {
        draft.suggestions = action.payload.suggestions;
      }),
  },
  initialState
);

const actionCreators = {
  getRoomDB,
  addRoomDB,
  joinRoomDB,
  exitRoomDB,
  getSuggestionsDB,
};

export { actionCreators };
