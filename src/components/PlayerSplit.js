import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commonActions } from "../redux/modules/common";
import useInterval from "./Hooks/useInterval";
import BeforeTimer from "./BeforeTimer";

function Player(props) {
  // useSelector로 방정보 받아오고, params이용해 주소창에서 roomId받아와서 일치하는 방정보 추출
  const roomInfo = props.roomInfo;
  const dispatch = useDispatch();

  const { isMuted, vol } = props;
  // 동영상 재생으로 관리될 변수들
  // const createdAt = new Date(roomInfo.createdAt);
  // const videoStartAfter = roomInfo.videoStartAfter;
  const player = React.useRef();
  // const sendCurYoutubeTime = React.useRef();
  const [isPlaying, setIsPlaying] = React.useState(false);

  const NewMedia = window.matchMedia("screen and (max-width: 1440px)");

  const endVideo = () => {
    const recordsData = {
      workOutTime: Math.ceil(player.current.getDuration() / 60),
      category: roomInfo.category,
    };

    dispatch(commonActions.saveRecordsDB(recordsData));
    props.setIsDone(true);
    setIsPlaying(false);
  };

  console.log("유투브플레이어");

  return (
    <Container>
      {/* <div style={{ pointerEvents: "none" }}> */}
      <BeforeTimer
        roomInfo={roomInfo}
        setIsPlaying={setIsPlaying}
        player={player}
      ></BeforeTimer>
      <ReactPlayer
        url={roomInfo.videoUrl}
        width={NewMedia.matches ? "758px" : "1095px"} //"758px" //1096px
        height={NewMedia.matches ? "426px" : "616px"} //"426px" //616px
        ref={player}
        playing={isPlaying}
        // 특정시점부터 시작
        config={{
          youtube: {
            playerVars: {
              start: 1,
            },
          },
        }}
        onStart={() => {
          props.setIsStart(true);
        }}
        onEnded={endVideo}
        muted={isMuted}
        volume={vol / 20}
        controls
      />
      {/* </div> */}
    </Container>
  );
}

const Container = styled.div`
  width: 1095px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 1440px) {
    width: 758px;
    height: 100%;
  }
`;

export default React.memo(Player);
