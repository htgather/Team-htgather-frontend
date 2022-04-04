import React from "react";
import styled from "styled-components";

import { actionCreators as roomActions } from "../../redux/modules/room";
import { useDispatch, useSelector } from "react-redux";
import defaultThumbnail from "./Images/RecommendModal_DefaultThumbnail.png";
// import emoji from '../Images/RoomCardIcon_emoji.svg';

const RecommendList = (props) => {
  const dispatch = useDispatch();
  const suggestionsList = useSelector((state) => state.room.suggestions);
  React.useEffect(() => {
    dispatch(roomActions.getSuggestionsDB());
  }, []);

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
        {suggestionsList.length === 3 && (
          <div>
            <RecommendCard>
              <img
                src={defaultThumbnail}
                alt=""
                className="RecommendThumbnail"
              />

              <p className="RecommendTitle">
                아직 운동 기록이 없어요.
                <br />
                마지막으로 운동한 영상이 이곳에 나타날 거예요.
              </p>
            </RecommendCard>
          </div>
        )}
        {suggestionsList.map((e, i) => (
          <RecommendCard
            key={i}
            onClick={() => {
              insertLink(e.link);
            }}
          >
            <img src={e.thumbnail} alt="" className="RecommendThumbnail" />
            <div className="RecommendTextBox">
              <p className="RecommendTitle">{e.title}</p>
              <div>
                <p className="RecommendTextSmall">{e.channelTitle}</p>
                <p className="RecommendTextSmall">재생시간 {e.duration}</p>
              </div>
            </div>
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
  .RecommendTextBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 117px;
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
