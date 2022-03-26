import React, { useEffect } from "react";
import styled from "styled-components";
import { _parserVideoId, _getVideoInfo } from "../YoutubeDataAPI";
const RecommendList = () => {
  const suggestions = {
    recentUrl: "https://www.youtube.com/watch?v=soSdvC_Gows",
    bestUrls: [
      "https://www.youtube.com/watch?v=jiuhGYenRg4",
      "https://www.youtube.com/watch?v=nm8q5ZfFpdc",
      "https://www.youtube.com/watch?v=nm8q5ZfFpdc",
    ],
  };
  const suggestionsArray = [
    suggestions["recentUrl"],
    ...suggestions["bestUrls"],
  ];
  // const cardInfo = React.useRef();
  let cardInfo = [];
  React.useEffect(() => {
    suggestionsArray.map(async (e, i) => {
      let videoId = _parserVideoId(suggestionsArray[i]);
      cardInfo.push(await _getVideoInfo(videoId));
    });
    console.log(cardInfo);
  }, []);
  return (
    <RecommendListContainer>
      <RecommendHeader>
        <div className="lastHeader">마지막으로 본 영상</div>
        <div className="top3Header">전체 인기 Top 3</div>
      </RecommendHeader>
      <RecommendCards>
        {suggestionsArray.map((e, i) => {
          return (
            <RecommendCard key={i}>
              {/* <img src={cardInfo[i]["thumbnail"]} alt="" /> */}
            </RecommendCard>
          );
        })}
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
  background: green;
  position: absolute;
  color: #878e95;
  z-index: 4;
  padding: 16px 10px 10px 10px;
`;
const RecommendHeader = styled.div`
  display: flex;
  font-size: 13px;
  font-weight: bold;
  line-height: 1.54;
  letter-spacing: -0.52px;
  margin-bottom: 4px;
`;

const RecommendCards = styled.div`
  display: flex;
`;
const RecommendCard = styled.div`
  width: 138px;
  height: 196px;
  padding: 0 10px 10px;
  padding: 0 10px 10px;
  background-color: #eaecef;
  &:hover {
    background-color: #eaecef;
  }
  .RecommendThumbnail {
    width: 118px;
    height: 66px;
  }
`;
export default RecommendList;
