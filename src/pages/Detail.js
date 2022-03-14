import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import DetailHeader from '../components/DetailHeader';
import ExitModal from '../components/modals/ExitModal';

import Player from '../components/Player';
import Progress from '../components/Progress';

import Mute from '../Images/Mute.png';
import Speaker from '../Images/Speaker.png';
import Video from '../Images/Video.png';
import Microphone from '../Images/Microphone.png';
import Happy from '../Images/Happy.png';
import Me from '../Images/Me.png';
import NoVideo from '../Images/NoVideo.png';
import Notmute from '../Images/Notmute.png';
import { actionCreators as roomActions } from '../redux/modules/room';

const Detail = (props) => {
  const roomId = props.match.params.roomId;
  const roomList = useSelector((state) => state.room.list);
  const roomInfo = roomList.filter((e, i) => e.roomId === roomId)[0];

  const [isStart, setIsStart] = React.useState();
  const [isDone, setIsDone] = React.useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [vol, setVol] = React.useState(10);
  const [isMuted, setIsMuted] = React.useState(true);
  const setClicked = () => {
    setIsClicked(!isClicked);
    setIsMuted(!isMuted);
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
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!roomInfo) {
      dispatch(roomActions.getRoomDB());
    }
  }, []);
  return (
    <Background>
      {roomInfo && (
        <>
          {isDone && <ExitModal isDone={isDone} setIsDone={setIsDone}></ExitModal>}
          <DetailHeader roomInfo={roomInfo} />
          <DIV>
            <div>
              <TimerWrap>
                <Progress roomInfo={roomInfo} isStart={isStart}></Progress>
              </TimerWrap>
              <VideoWrap>
                <MainVideo>
                  <Player roomInfo={roomInfo} setIsStart={setIsStart} vol={vol} isMuted={isMuted} setIsDone={setIsDone}></Player>
                </MainVideo>
                <MemberWrap>
                  <MemberVideo>
                    <Circle>
                      <img src={Me} />
                    </Circle>
                  </MemberVideo>
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
                      <Btn style={{ width: '236px', justifyContent: 'flex-start' }}>
                        <img src={Speaker} alt="음량조절" onClick={setClicked} />
                        <VolInput
                          type="range"
                          min="0"
                          max="20"
                          value={vol}
                          onChange={(e) => {
                            setVol(e.target.value);
                          }}
                          style={{ margin: '8px' }}
                        />
                        <div>{vol}</div>
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
                        <img src={Notmute} alt="음소거해제" />
                        음소거해제
                      </>
                    ) : (
                      <>
                        <img src={Microphone} alt="음소거" />
                        음소거
                      </>
                    )}
                  </Btn>
                  <Btn onClick={setVideo}>
                    {videoOn ? (
                      <>
                        <img src={NoVideo} alt="마이크 음소거" />
                        비디오켜기
                      </>
                    ) : (
                      <>
                        <img src={Video} alt="카메라 버튼" />
                        비디오끄기
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
          </DIV>
        </>
      )}
      ;
    </Background>
  );
};

const Background = styled.div`
  margin: 0px auto;
`;

const BubbleWrap = styled.div`
  z-index: 50;
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
  z-index: 5;
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

const DIV = styled.div`
  width: 100%;
  height: 1000px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const TimerWrap = styled.div`
  width: 1096px;
  margin: 15px 0px;
  display: flex;
  justify-content: center;
  text-align: center;
  @media screen and (max-width: 1360px) {
    position: relative;
    left: -110px;
  }
`;

const VideoWrap = styled.div`
  width: 1320px;
  height: 616px;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 10px;
  box-sizing: border-box;
  @media screen and (max-width: 1360px) {
    width: 980px;
    height: 605px;
    margin: auto;
  }
`;

const MainVideo = styled.div`
  width: 1096px;
  line-height: 616px;
  border-radius: 12px;
  @media screen and (max-width: 1360px) {
    width: 758px;
    height: 428px;
    margin: 0px 0px 110px;
  }
`;

const MemberWrap = styled.div`
  height: 616px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 1360px) {
    position: absolute;
    right: 0px;
    top: -76px;
  }
`;

const MemberVideo = styled.div`
  width: 200px;
  height: 112px;
  border-radius: 8px;
  background-color: skyblue;
  position: relative;
  @media screen and (max-width: 1360px) {
    width: 202px;
    height: 113px;
  }
`;

const Circle = styled.div`
  position: absolute;
  bottom: 3px;
  right: 3px;
`;

const SoundBtn = styled.div`
  width: 740px;
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
  position: relative;
  @media screen and (max-width: 1360px) {
    width: 738px;
    margin: -114px 0px 0px 65px;
  }
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
const VolInput = styled.input`
  -webkit-appearance: none;
  width: 160px;
  position: relative;
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 4px;
    background-color: #4a5056;
    cursor: pointer;
    border-radius: 10px;
  }
  &::-webkit-slider-thumb {
    cursor: pointer;
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -4px;
    background: #4a5056;
  }
`;
export default Detail;
