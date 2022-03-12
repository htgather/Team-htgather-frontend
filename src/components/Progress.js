import React, { useState, useEffect, useRef } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import styled from 'styled-components';
import { duration } from 'moment';
import { changeToSeconds } from './YoutubeDataAPI';

export default function Timer(props) {
  const videoLength = changeToSeconds(props.roomInfo.videoLength) - 2;

  const [text, setText] = useState('오늘도 운동하는 여러분👍🏻');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const hour = parseInt(hours);
  const min = parseInt(minutes);
  const sec = parseInt(seconds);
  const progressBar = useRef();

  useEffect(() => {
    if (props.roomInfo.videoLength.length > 3) {
      let temp = props.roomInfo.videoLength.split(':');
      if (temp.length === 3) {
        setHours(temp[0]);
        setMinutes(temp[1]);
        setSeconds(temp[2]);
      } else {
        setMinutes(temp[0]);
        setSeconds(temp[1]);
      }
    }
  }, []);

  useEffect(() => {
    if (!props.isStart) return;
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
      if (pg < videoLength) {
        setProgress(pg + 1);
      }
      if (pg >= videoLength * 0.25) {
        setText('화이팅!');
      }
      if (pg >= videoLength * 0.5) {
        setText('벌써 절반이나 왔어요!');
      }
      if (pg >= videoLength * 0.75) {
        setText('거의 다 왔습니다! 조금만 더 힘내요!');
      }
      if (pg === videoLength) {
        setText('👏🏻 오늘도 운동 완료! 다들 수고하셨습니다!');
        clearInterval(myProgressBar);
      }
    }, 1000);
    return () => clearInterval(myProgressBar);
  }, [progress, props.isStart]);

  return (
    <Wrap className="App" style={{ color: 'black' }}>
      <TextWrap>
        <h3>{text}</h3>
      </TextWrap>
      <div>
        <ProgressBar ref={progressBar} completed={progress} isLabelVisible={false} maxCompleted={videoLength} width={983} />
        <div>
          {hours < 10 ? `0${hours}` : hours}:{String(minutes).length < 2 ? '0' + minutes : minutes}:{String(seconds).length < 2 ? '0' + seconds : seconds}
        </div>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div``;
const TextWrap = styled.div``;
