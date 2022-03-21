import React, { useState, useEffect, useRef } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import styled from "styled-components";
import { changeToSeconds } from "./YoutubeDataAPI";
import { getTimeStringSeconds } from "./YoutubeDataAPI";

export default function Timer(props) {
  const roomInfo = props.roomInfo;
  const createdAt = new Date(roomInfo.createdAt);
  const videoStartAfter = roomInfo.videoStartAfter;

  const [videoLength, setVideoLength] = useState(120);
  const [text, setText] = useState("오늘도 운동하는 여러분👍🏻");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);

  const hour = parseInt(hours);
  const min = parseInt(minutes);
  const sec = parseInt(seconds);
  const progressBar = useRef();

  // JavaScript에 미디어쿼리를 사용하는 matchMedia()
  const NewMedia = window.matchMedia("screen and (max-width: 1360px)");
  // console.log(NewMedia.media);
  // console.log('match는', NewMedia.matches);
  // window addEventListener
  //찍힌다요~

  // const test = () => {
  //   if (NewMedia.matches) {
  //     setAbc(647);
  //   }
  // };

  useEffect(() => {
    const now = Date.now();
    const videoStart = createdAt.getTime() + videoStartAfter * 60000;
    const diffMs = parseInt(videoStart - now);
    const diffS = parseInt(diffMs / 1000);
    setVideoLength(
      diffS <= 0 && Math.abs(diffS) < changeToSeconds(roomInfo.videoLength)
        ? changeToSeconds(roomInfo.videoLength) - parseFloat(Math.abs(diffS))
        : changeToSeconds(roomInfo.videoLength)
      //-2
    );
    diffS < 0 ? setProgress(parseFloat(Math.abs(diffS))) : setProgress(0);
  }, []);

  useEffect(() => {
    let temp = getTimeStringSeconds(videoLength).split(":");
    if (temp.length === 3) {
      setHours(temp[0]);
      setMinutes(temp[1]);
      setSeconds(temp[2]);
    } else {
      setMinutes(temp[0]);
      setSeconds(temp[1]);
    }
  }, [videoLength]);

  useEffect(() => {
    if (!props.isStart) return;
    if (videoLength <= 0) {
      clearInterval(countdown);
    }
    const countdown = setInterval(() => {
      if (sec > 0) {
        setSeconds(sec - 1);
      }
      if (sec === 0) {
        if (min === 0) {
          if (hour === 0) {
            clearInterval(countdown);
          } else {
            setHours(hour - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          if (hours === 0) {
            setMinutes(min - 1);
            setSeconds(59);
          } else {
            setMinutes(min - 1);
            setSeconds(59);
          }
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [hours, minutes, seconds, props.isStart]);

  useEffect(() => {
    if (!props.isStart) return;

    const pg = parseInt(progress);
    const myProgressBar = setInterval(() => {
      if (pg < changeToSeconds(roomInfo.videoLength)) {
        setProgress(pg + 1);
      }
      if (pg >= changeToSeconds(roomInfo.videoLength) * 0.245) {
        setText("화이팅!");
      }
      if (pg >= changeToSeconds(roomInfo.videoLength) * 0.45) {
        setText("벌써 절반이나 왔어요!");
      }
      if (pg >= changeToSeconds(roomInfo.videoLength) * 0.745) {
        setText("거의 다 왔습니다! 조금만 더 힘내요!");
      }
      if (pg === changeToSeconds(roomInfo.videoLength)) {
        setText("👏🏻 오늘도 운동 완료! 다들 수고하셨습니다!");
        clearInterval(myProgressBar);
      }
    }, 1000);
    return () => clearInterval(myProgressBar);
  }, [progress, props.isStart]);

  return (
    <div className="App" style={{ color: "black" }}>
      <div style={{ margin: "0px 0px 1px 0px" }}>
        <TextWrap>{text}</TextWrap>
      </div>

      <Contents style={{ justifyContent: NewMedia.matches ? "center" : "" }}>
        <ProgressWrap>
          <ProgressBar
            ref={progressBar}
            completed={progress}
            isLabelVisible={false}
            maxCompleted={changeToSeconds(roomInfo.videoLength) - 1}
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
