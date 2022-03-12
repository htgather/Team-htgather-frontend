import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { HiVolumeUp } from 'react-icons/hi';
import { FaVolumeMute } from 'react-icons/fa';
import DetailHeader from '../components/DetailHeader';
import ExitModal from '../components/modals/ExitModal';
import Timer from '../components/Progress';
import Player from '../components/Player';
import Progress from '../components/Progress';

import Mute from '../Images/Mute.png';
import Speaker from '../Images/Speaker.png';
import Video from '../Images/Video.png';
import Microphone from '../Images/Microphone.png';
import Happy from '../Images/Happy.png';
import People from '../Images/People.png';

const GyuDetail = (props) => {
  const roomId = props.match.params.roomId;
  const roomList = useSelector((state) => state.room.list);
  const roomInfo = roomList.filter((e, i) => e.roomId === roomId)[0];
  const [isStart, setIsStart] = React.useState();

  const [isClicked, setIsClicked] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [encourage, setEncourage] = useState(false);

  const setClicked = () => {
    setIsClicked(!isClicked);
  };

  const setSound = () => {
    setSoundOn(!soundOn);
  };

  const setVideo = () => {
    setVideoOn(!videoOn);
  };

  const fighting = () => {
    window.alert('💪🏻');
  };
  return (
    <>
      <DetailHeader />

      <Detail>
        <div>
          <TimerWrap>
            <Progress roomInfo={roomInfo} isStart={isStart}></Progress>
          </TimerWrap>
          <VideoWrap>
            <MainVideo>
              {' '}
              <Player roomInfo={roomInfo} setIsStart={setIsStart}></Player>
            </MainVideo>
            <MemberWrap>
              <MemberVideo />
              <MemberVideo />
              <MemberVideo />
              <MemberVideo />
              <MemberVideo />
            </MemberWrap>
          </VideoWrap>

          <SoundBtn>
            <div>
              {isClicked ? (
                <>
                  <Btn onClick={setClicked} style={{ width: '236px' }}>
                    <img src={Speaker} alt="음량조절" />
                    <div>음량조절</div>
                    <div>음량수치</div>
                  </Btn>
                </>
              ) : (
                <>
                  <BubbleWrap>
                    <div>먼저 음소거해제 버튼을 눌러주세요!</div>
                  </BubbleWrap>
                  <Btn onClick={setClicked}>
                    <img src={Mute} alt="비디오 음소거해제 버튼" />
                    <div>음소거해제</div>
                  </Btn>
                </>
              )}
            </div>
            <BtnWrap>
              <Btn onClick={setSound}>
                {soundOn ? (
                  <>
                    <img alt="마이크 음소거" />
                    on
                  </>
                ) : (
                  <>
                    <img src={Microphone} alt="음량조절 버튼" />
                    off
                  </>
                )}
              </Btn>
              <Btn onClick={setVideo}>
                {videoOn ? (
                  <>
                    <img alt="마이크 음소거" />
                    on
                  </>
                ) : (
                  <>
                    <img src={Video} alt="카메라 버튼" />
                    off
                  </>
                )}
              </Btn>
              <Btn onClick={fighting}>
                <img src={Happy} alt="격려하기" />
                격려하기
              </Btn>
            </BtnWrap>
          </SoundBtn>
        </div>
      </Detail>
    </>
  );
};

const BubbleWrap = styled.div`
  width: 245px;
  height: 40px;
  color: #f8f9fa;
  background-color: #0028fa;
  border-radius: 4px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 55px;
  left: 35px;
  :after {
    border-top: 10px solid #0028fa;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid;
    content: '';
    position: absolute;
    bottom: -9px;
    left: 20px;
  }
`;

const Detail = styled.div`
  width: 100%;
  height: 1000px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimerWrap = styled.div`
  width: 1096px;
  margin: 15px 0px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const VideoWrap = styled.div`
  width: 1320px;
  height: 616px;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 10px;
  box-sizing: border-box;
`;

const MainVideo = styled.div`
  width: 1096px;
  line-height: 616px;
  border-radius: 12px;
  background-color: navy;
`;

const MemberWrap = styled.div`
  height: 616px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MemberVideo = styled.div`
  width: 200px;
  height: 112px;
  border-radius: 8px;
  background-color: skyblue;
`;

const SoundBtn = styled.div`
  width: 740px;
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
  position: relative;
`;

const BtnWrap = styled.div`
  width: 380px;
  display: flex;
  justify-content: space-between;
  text-align: center;
`;

const Btn = styled.div`
  width: 114px;
  height: 48px;
  color: #4a5056;
  background-color: rgba(0, 40, 250, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  cursor: pointer;
`;

export default GyuDetail;
