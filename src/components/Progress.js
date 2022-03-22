import React, { useState, useEffect, useRef } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import styled from "styled-components";
import { changeToSeconds } from "./YoutubeDataAPI";
import { getTimeStringSeconds } from "./YoutubeDataAPI";

function Progress(props) {
  const { roomInfo, curYoutubeTime } = props;

  // const [leftVideoLength, setLeftVideoLength] = useState(120);
  const [text, setText] = useState("오늘도 운동하는 여러분👍🏻");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const progressBar = useRef();

  // JavaScript에 미디어쿼리를 사용하는 matchMedia()
  const NewMedia = window.matchMedia("screen and (max-width: 1360px)");

  useEffect(() => {}, []);

  // 타이머 표시 _ 총길이 - 현재시간을 시분초로
  useEffect(() => {
    const diffS = parseInt(
      changeToSeconds(roomInfo.videoLength) - curYoutubeTime
    );
    let temp = getTimeStringSeconds(diffS).split(":");
    if (temp.length === 3) {
      setHours(temp[0]);
      setMinutes(temp[1]);
      setSeconds(temp[2]);
    } else {
      setMinutes(temp[0]);
      setSeconds(temp[1]);
    }
  }, [curYoutubeTime]);

  // 프로그래스 단위 초
  useEffect(() => {
    const pg = parseInt(curYoutubeTime);
    if (pg >= changeToSeconds(roomInfo.videoLength) * 0.245) {
      setText("화이팅!!");
    }
    if (pg >= changeToSeconds(roomInfo.videoLength) * 0.5) {
      setText("벌써 절반이나 왔어요!");
    }
    if (pg >= changeToSeconds(roomInfo.videoLength) * 0.745) {
      setText("거의 다 왔습니다! 조금만 더 힘내요!");
    }
    if (pg === changeToSeconds(roomInfo.videoLength)) {
      setText("👏🏻 오늘도 운동 완료! 다들 수고하셨습니다!");
    }
  }, [curYoutubeTime]);

  return (
    <div className="App" style={{ color: "black" }}>
      <div style={{ margin: "0px 0px 1px 0px" }}>
        <TextWrap>{text}</TextWrap>
      </div>

      <Contents style={{ justifyContent: NewMedia.matches ? "center" : "" }}>
        <ProgressWrap>
          <ProgressBar
            ref={progressBar}
            completed={curYoutubeTime}
            isLabelVisible={false}
            maxCompleted={changeToSeconds(roomInfo.videoLength)}
            // width="983px"
            // width={NewMedia.matches ? 634 : 983}
            height="12px"
            bgColor="#0028fa"
          />
        </ProgressWrap>
        <TextWrap style={{ marginLeft: NewMedia.matches ? "2px" : "" }}>
          {String(hours) === "00" ? "" : hours + ":"}
          {String(minutes).length < 2 ? "0" + minutes : minutes}:
          {String(seconds).length < 2 ? "0" + seconds : seconds}
        </TextWrap>
      </Contents>
    </div>
  );
}

const Contents = styled.div`
  width: 1095px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1440px) {
    width: 758px;
    height: 50px;
  }
  margin-bottom: 24px;
`;

const ProgressWrap = styled.div`
  position: relative;
  width: 100%;
  margin-right: 10px;
`;

const TextWrap = styled.div`
  font-size: 24px;
  font-weight: 500;
  line-height: 1.4;
  ${"" /* color: rgb(34, 307, 41); */}
`;
export default Progress;
