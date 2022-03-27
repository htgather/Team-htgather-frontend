import React, { useEffect } from "react";
import styled from "styled-components";
import { _parserVideoId, _getVideoInfo } from "../YoutubeDataAPI";
import { actionCreators as roomActions } from "../../redux/modules/room";
import { useDispatch, useSelector } from "react-redux";

const RecommendList = (props) => {
  const dispatch = useDispatch();
  const suggestionsList = useSelector((state) => state.room.suggestions);
  React.useEffect(() => {
    dispatch(roomActions.getSuggestionsDB());
  }, []);
  // const suggestions = {
  //   recentUrl: "https://www.youtube.com/watch?v=soSdvC_Gows",
  //   bestUrls: [
  //     "https://www.youtube.com/watch?v=jiuhGYenRg4",
  //     "https://www.youtube.com/watch?v=LCetNA5tUTE",
  //     "https://www.youtube.com/watch?v=nm8q5ZfFpdc",
  //   ],
  // };

  // let cardInfo = [
  //   {
  //     channelTitle: "정아로 / ARO",
  //     duration: "34:09",
  //     thumbnail: "https://i.ytimg.com/vi/soSdvC_Gows/hqdefault.jpg",
  //     title:
  //       "[Playlist] 우린 같은 곳을 보면서 서로 같은 답을 못했어 : 정아로 플레이리스트",
  //   },
  //   {
  //     channelTitle: "문화인 - MUN HWA IN",
  //     duration: "1:18:47",
  //     thumbnail: "https://i.ytimg.com/vi/jiuhGYenRg4/hqdefault.jpg",
  //     title:
  //       "𝒑𝒍𝒂𝒚𝒍𝒊𝒔𝒕 | 잠 안 오는 밤, 문득 너가 생각나는 노래들 :: K-INDIE PICKS ::",
  //   },
  //   {
  //     channelTitle: "정아로 / ARO",
  //     duration: "34:09",
  //     thumbnail: "https://i.ytimg.com/vi/soSdvC_Gows/hqdefault.jpg",
  //     title:
  //       "[Playlist] 우린 같은 곳을 보면서 서로 같은 답을 못했어 : 정아로 플레이리스트",
  //   },
  //   {
  //     channelTitle: "문화인 - MUN HWA IN",
  //     duration: "1:07:34",
  //     thumbnail: "https://i.ytimg.com/vi/nm8q5ZfFpdc/hqdefault.jpg",
  //     title:
  //       "𝒑𝒍𝒂𝒚𝒍𝒊𝒔𝒕 | 너랑 한강가서 들으려고 또 준비한 노래 :: K-INDIE PICKS ::",
  //   },
  // ];

  // function insertLink(e, i) {
  //   let videoId = _parserVideoId(e);
  //   _getVideoInfo(videoId).then((info) => {
  //     return (
  //       // <RecommendCard
  //       //   key={i}
  //       //   onClick={() => {
  //       //     insertLink(e);
  //       //   }}
  //       // >
  //       //   <img src={info.thumbnail} alt="" className="RecommendThumbnail" />
  //       //   <p className="RecommendTitle">{info["title"]}</p>
  //       //   <p className="RecommendTextSmall">{info["channelTitle"]}</p>
  //       //   <p className="RecommendTextSmall">재생시간 {info["duration"]}</p>
  //       // </RecommendCard>
  //       <div>das</div>
  //     );
  //   });
  // }
  // const [cardInfos, setCardInfo] = React.useState([]);
  // React.useEffect(() => {
  //   const getInfo = async (link) => {
  //     let info = await _getVideoInfo(link);
  //     setCardInfo([//cardInfos,info]);
  //   };
  //   suggestionsArray.map((e, i) => {
  //     getInfo(_parserVideoId(e));
  //   });
  // }, []);

  // React.useEffect(() => {
  //   suggestionsArray.map(async (e, i) => {
  //     let videoId = _parserVideoId(e);
  //     cardInfosRef.current.push(await _getVideoInfo(videoId));
  //   });
  // }, [suggestionsArray]);

  // const cardInfosRef = React.useRef([]);
  // React.useEffect(() => {
  //   setCardInfo(cardInfosRef.current);
  // }, [cardInfosRef.current]);

  // const [cardInfos, setCardInfo] = React.useState([]);
  // const cardInfosRef = React.useRef([]);
  // useEffect(() => {
  //   async function pushCardInfo(link) {
  //     const info = await _getVideoInfo(_parserVideoId(link));
  //     cardInfosRef.current.push(info);
  //     // setCardInfo(cardInfosRef.current);
  //   }
  //   suggestionsArray.map((e, i) => {
  //     pushCardInfo(e);
  //   });
  // }, [cardInfos]);
  // const suggestionsArray = [
  //   suggestionsList["recentUrl"],
  //   ...suggestionsList["bestUrls"],
  // ];
  // const cardInfosRef = React.useRef([]);
  // React.useEffect(() => {
  //   const getInfo = async (link) => {
  //     let info = await _getVideoInfo(link);
  //     cardInfosRef.current = info;
  //   };
  //   suggestionsArray.map((e, i) => {
  //     getInfo(_parserVideoId(e));
  //   });
  // }, [suggestionsList]);
  function insertLink(link) {
    props.$LinkInput.current.value = link;
    props.setIsRecommend(false);
  }
  return (
    <RecommendListContainer>
      <RecommendHeader>
        <div className="lastHeader" style={{ marginRight: "46px" }}>
          마지막으로 본 영상
        </div>
        <div className="top3Header">전체 인기 Top 3</div>
      </RecommendHeader>
      <RecommendCards>
        {suggestionsList.length === 4 &&
          suggestionsList.map((e, i) => (
            <RecommendCard
              key={i}
              onClick={() => {
                insertLink(e.link);
              }}
            >
              <img src={e.thumbnail} alt="" className="RecommendThumbnail" />
              <p className="RecommendTitle">{e.title}</p>
              <p className="RecommendTextSmall">{e.channelTitle}</p>
              <p className="RecommendTextSmall">재생시간 {e.duration}</p>
            </RecommendCard>
          ))}
      </RecommendCards>
    </RecommendListContainer>
  );
};
const RecommendListContainer = styled.div`
  width: 572px;
  height: 246px;
  margin: 28px 0 0;
  padding: 32px 0 10px;
  border-radius: 8px;
  background-color: #f8f9fa;
  // background: green;
  position: absolute;
  color: #878e95;
  z-index: 1;
  padding: 16px 10px 10px 10px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  top: 32px;
`;
const RecommendHeader = styled.div`
  display: flex;
  font-size: 13px;
  font-weight: bold;
  line-height: 1.54;
  letter-spacing: -0.52px;
  margin-bottom: 4px;
  margin-left: 10px;
`;

const RecommendCards = styled.div`
  display: flex;
`;
const RecommendCard = styled.div`
  cursor: pointer;
  width: 138px;
  height: 196px;
  padding: 0 10px 10px;
  padding: 0 10px 10px;
  // background-color: #eaecef;
  &:hover {
    background-color: #eaecef;
  }
  .RecommendThumbnail {
    width: 118px;
    height: 66px;
    object-fit: cover;
  }
  .RecommendTitle {
    font-size: 12px;
    font-weight: normal;
    line-height: 1.67;
    letter-spacing: -0.48px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin: 5px 0px 12px 0px;
  }
  .RecommendTextSmall {
    font-size: 12px;
    font-weight: normal;
    line-height: 1.67;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export default RecommendList;
