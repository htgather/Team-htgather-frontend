import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { HiVolumeUp } from "react-icons/hi";
import { FaVolumeMute } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function Detail(props) {
  // useSelector로 방정보 받아오고, params이용해 주소창에서 roomId받아와서 일치하는 방정보 추출
  const roomList = useSelector((state) => state.room.list);
  const roomId = props.match.params.roomId;
  const roomInfo = roomList.filter((e, i) => e.roomId === roomId)[0];

  // 동영상 재생으로 관리될 변수들
  const createdAt = new Date(roomInfo.createdAt);
  const videoStartAfter = roomInfo.videoStartAfter;
  const player = React.useRef();
  const [countTime, setCountTime] = React.useState();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);

  //초를 시분초로 바꿔주는 함수 HH:MM:SS형식으로 바꿔줌
  function getTimeStringSeconds(seconds) {
    let hour, min, sec;
    hour = parseInt(seconds / 3600);
    min = parseInt((seconds % 3600) / 60);
    sec = seconds % 60;
    if (hour.toString().length === 1) hour = "0" + hour;
    if (min.toString().length === 1) min = "0" + min;
    if (sec.toString().length === 1) sec = "0" + sec;
    return hour + ":" + min + ":" + sec;
  }

  // 타이머에 표시할 시작시간-현재시간_HH:MM:SS를 받아서 MM:SS로 표기
  function calCount(Time) {
    let m = Time.split(":")[1];
    let s = Time.split(":")[2];
    if (s < 0) {
      m = m - 1;
      s = s + 60;
    }
    if (m < 0) {
      m = m + 60;
    }
    let result = m + ":" + s;
    return result;
  }

  React.useEffect(() => {
    // 방입장시 동영상시작예정시간-현재시간을 setTimeout으로 계속 받아와서 타이머로 나타냄
    let getTimeInterval = setInterval(() => {
      const now = Date.now();
      const videoStart = createdAt.getTime() + videoStartAfter * 60000;
      const diffMs = parseInt(videoStart - now);
      const durationS = Math.floor(player.current.getDuration());
      let diffS = parseInt(diffMs / 1000);
      if (diffS > 0) {
        setCountTime(calCount(getTimeStringSeconds(diffS)));
      }
      // 차이가 0이 되면 동영상을 재생
      // 이때 -가 되면 그 차이의 절댓값부터 동영상을 재생
      // 차이의 절댒값이 동영상의 길이보다 크면 영상이 종료되었습니다 띄움.
      if (diffS <= 0) {
        if (Math.abs(diffS) < durationS) {
          player.current.seekTo(parseFloat(Math.abs(diffS)));
          setIsPlaying(true);
          clearInterval(getTimeInterval);
          setCountTime(false);
        } else if (Math.abs(diffS) >= durationS) {
          setCountTime("영상이 종료되었습니다");
        }
      }
    }, 1000);
    // unMount되는 경우 interval함수 제거
    return () => clearInterval(getTimeInterval);
  }, []);

  return (
    <Container>
      <div style={{ pointerEvents: "none" }}>
        {countTime && <Count>{countTime}</Count>}
        <ReactPlayer
          url={roomInfo.videoUrl}
          controls
          width="1116px"
          height="627px"
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
            // window.alert("시작이때부터 프로그래스바 카운트");
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
  position: absolute;
  top: 0;

  background: #171717;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  * {
    font-size: 1.1em;
    font-weight: 700;
  }
`;

const Count = styled.div`
  width: 1116px;
  height: 627px;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 140px;
  color: white;
  position: absolute;
`;
export default Detail;
