import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { HiVolumeUp } from "react-icons/hi";
import { FaVolumeMute } from "react-icons/fa";
import { getTimeStringSeconds, calCount } from "./YoutubeDataAPI";

function Player(props) {
  // useSelector로 방정보 받아오고, params이용해 주소창에서 roomId받아와서 일치하는 방정보 추출

  const roomInfo = props.roomInfo;

  // 동영상 재생으로 관리될 변수들
  const createdAt = new Date(roomInfo.createdAt);
  const videoStartAfter = roomInfo.videoStartAfter;
  const player = React.useRef();
  const [countTime, setCountTime] = React.useState();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);

  React.useEffect(() => {
    // 방입장시 동영상시작예정시간-현재시간을 setTimeout으로 계속 차이를 계산해서 타이머로 나타냄
    let getTimeInterval = setInterval(() => {
      const now = Date.now();
      const videoStart = createdAt.getTime() + videoStartAfter * 60000;
      const diffMs = parseInt(videoStart - now);
      const durationS = Math.floor(player.current.getDuration()); // 영상길이(초단위)
      let diffS = parseInt(diffMs / 1000); // 동영상시작예정시간-현재시간(초단위)
      if (diffS > 0) {
        setCountTime(calCount(getTimeStringSeconds(diffS)));
      }
      // 차이가 0보다 작으면 동영상을 재생
      // -일때는 그 차이의 절댓값부터 동영상을 재생
      // 차이의 절댒값이 동영상의 길이보다 크면 영상이 종료되었습니다 띄움.
      if (diffS <= 0) {
        if (Math.abs(diffS) < durationS) {
          player.current.seekTo(parseFloat(Math.abs(diffS)));
          setIsPlaying(true);
          clearInterval(getTimeInterval);
          setCountTime(false);
        } else if (durationS && Math.abs(diffS) > durationS) {
          // durationS 비동기로 받아오는 값.
          setCountTime("영상이 종료되었습니다");
        }
      }
    }, 100);
    // unMount되는 경우 interval함수 제거
    return () => clearInterval(getTimeInterval);
  }, [roomInfo]);

  return (
    <Container>
      <div style={{ pointerEvents: "none" }}>
        {countTime && <Count>{countTime}</Count>}
        <ReactPlayer
          url={roomInfo.videoUrl}
          controls
          width="1096px"
          height="616px"
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
          onEnded={() => {
            setCountTime("영상이 종료되었습니다");
          }}
          muted={isMuted}
        />
      </div>
      {isMuted ? (
        <FaVolumeMute
          style={{ color: "white", fontSize: "60px" }}
          onClick={() => {
            setIsMuted(!isMuted);
          }}
        />
      ) : (
        <HiVolumeUp
          style={{ color: "white", fontSize: "60px" }}
          onClick={() => {
            setIsMuted(!isMuted);
          }}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 1096px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  * {
    font-size: 0.6em;
    font-weight: 700;
  }
`;

const Count = styled.div`
  width: 1096px;
  height: 616px;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  color: white;
  position: absolute;
  z-index: 2;
`;
export default Player;
