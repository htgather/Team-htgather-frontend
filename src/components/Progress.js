import React, { useState, useEffect, useRef } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import styled from 'styled-components';
import { duration } from 'moment';

export default function Timer({ width, percent }) {
  const videoLength = 44; //1분 50초 => 초로

  const [text, setText] = useState('오늘도 운동하는 여러분👍🏻');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(44);

  const [progress, setProgress] = useState(0);

  const hour = parseInt(hours);
  const min = parseInt(minutes);
  const sec = parseInt(seconds);

  const progressBar = useRef();

  useEffect(() => {
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
  }, [hours, minutes, seconds]);

  useEffect(() => {
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
  }, [progress]);

  return (
    <div className="App">
      <div>
        <h2>
          {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h2>
        <h3>{text}</h3>
      </div>
      <ProgressBar ref={progressBar} completed={progress} isLabelVisible={false} maxCompleted={videoLength} />
    </div>
  );
}

const BarWrap = styled.div`
  background-color: rgb(233, 233, 233);
  border-radius: 0.5rem;
`;

const Bar = styled.div`
  background-color: rgb(62, 122, 235);
  height: 10px;
  border-radius: 1rem;
  transition: 1s ease;
  transition-delay: 0.5s;
`;
