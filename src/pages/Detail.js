import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

import styled from "styled-components";

import DetailHeader from "../Components/Detail/DetailHeader";

import Player from "../Components/Detail/Player";
import Progress from "../Components/Detail/Progress";
import TabletPortrait from "../Components/Common/TabletPortrait";

import Mute from "./Images/Detail_Mute.svg";
import Speaker from "./Images/Detail_Speaker.svg";
import Microphone from "./Images/Detail_Microphone.svg";
import Notmute from "./Images/Detail_NotMute.svg";
import Video from "./Images/Detail_Video.svg";
import NoVideo from "./Images/Detail_NoVideo.svg";
import Happy from "./Images/Detail_Happy.svg";

import { actionCreators as roomActions } from "../redux/modules/room";
import Videoplayer from "../Components/Detail/VideoPlayer";
import jwt_decode from "jwt-decode";
import CompleteModal from "../Components/Modals/CompleteModal";
import RoomClickModalForLogin from "../Components/Modals/RoomClickModalForLogin";
const Detail = (props) => {
  // console.log("디테일");
  const roomId = props.match.params.roomId;
  const roomList = useSelector((state) => state.room.list);
  const roomInfo = roomList.filter((e, i) => e.roomId === roomId)[0];
  const isLocal = localStorage.getItem("isLogin") ? true : false;
  const nickname = isLocal
    ? jwt_decode(localStorage.getItem("isLogin")).nickName
    : null;
  const [isStart, setIsStart] = React.useState();
  const [isDone, setIsDone] = React.useState(false);
  const [isDoneModal, setIsDoneModal] = React.useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [modalOn, setModalOn] = React.useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [vol, setVol] = React.useState(10);
  const [isMuted, setIsMuted] = React.useState(true);
  const [numberOfUsers, setNumberOfUsers] = React.useState("1/5");

  // 모바일 접속시
  const NewMedia = window.matchMedia("screen and (max-width:767px)");

  const childRef = React.useRef();
  const changeNumberOfUsers = (text) => {
    setNumberOfUsers(text);
  };
  // 영상 음소거
  const setClicked = () => {
    setIsClicked(!isClicked);
    setIsMuted(!isMuted);
  };

  const setSound = () => {
    setSoundOn(!soundOn);
    childRef.current.handleMuteClick();
  };

  const setVideo = () => {
    setVideoOn(!videoOn);
    childRef.current.handleCameraClick();
  };

  const fighting = () => {
    childRef.current.showEmoji();
  };

  const popLoginModal = () => {
    setModalOn(true);
  };

  // 영상 시작 전 음소거
  const offWebcamSound = () => {
    setSoundOn(true);
    childRef.current.handleAllMute();
  };

  React.useEffect(() => {
    if (isStart) {
      offWebcamSound();
    }
  }, [isStart]);

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (NewMedia.matches) {
      history.replace("/");
      return;
    }

    if (!roomInfo) {
      if (!isLocal) {
        var result = window.confirm("로그인이 필요합니다.");
        if (result) {
          popLoginModal();
        } else {
          history.replace("/");
        }
      }
      dispatch(roomActions.getRoomDB());
    }
  }, []);

  return (
    <>
      <TabletPortrait />
      {isLocal ? (
        <Background>
          {roomInfo && (
            <>
              {isDone && isDoneModal && (
                <CompleteModal
                  isDone={isDone}
                  setIsDoneModal={setIsDoneModal}
                ></CompleteModal>
              )}
              <DetailHeader
                roomInfo={roomInfo}
                numberOfUsers={numberOfUsers}
                isDone={isDone}
              />
              <DIV>
                <div>
                  <TimerWrap>
                    <Progress
                      roomInfo={roomInfo}
                      isStart={isStart}
                      isDone={isDone}
                    ></Progress>
                  </TimerWrap>
                  <VideoWrap>
                    <MainVideo>
                      <Player
                        roomInfo={roomInfo}
                        setIsStart={setIsStart}
                        vol={vol}
                        isMuted={isMuted}
                        setIsDone={setIsDone}
                        isDone={isDone}
                        offWebcamSound={offWebcamSound}
                      ></Player>
                    </MainVideo>
                    <Videoplayer
                      nickname={nickname}
                      roomId={roomId}
                      changeNumberOfUsers={changeNumberOfUsers}
                      ref={childRef}
                    ></Videoplayer>
                  </VideoWrap>

                  <SoundBtn>
                    <div>
                      {isClicked ? (
                        <>
                          <Btn
                            style={{
                              width: "236px",
                              justifyContent: "flex-start",
                            }}
                          >
                            <img
                              src={Speaker}
                              alt="음량조절"
                              onClick={setClicked}
                            />
                            <VolInput
                              type="range"
                              min="0"
                              max="20"
                              value={vol}
                              onChange={(e) => {
                                setVol(e.target.value);
                              }}
                              style={{ margin: "8px" }}
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
                            <div>음소거 해제</div>
                          </Btn>
                        </>
                      )}
                    </div>

                    <BtnWrap>
                      <Btn onClick={setSound}>
                        {soundOn ? (
                          <>
                            <img src={Notmute} alt="음소거 해제" />
                            마이크 켜기
                          </>
                        ) : (
                          <>
                            <img src={Microphone} alt="음소거" />
                            마이크 끄기
                          </>
                        )}
                      </Btn>
                      <Btn onClick={setVideo}>
                        {videoOn ? (
                          <>
                            <img src={NoVideo} alt="마이크 음소거" />
                            비디오 켜기
                          </>
                        ) : (
                          <>
                            <img src={Video} alt="카메라 버튼" />
                            비디오 끄기
                          </>
                        )}
                      </Btn>
                      <Btn
                        onClick={fighting}
                        style={{ justifyContent: "center" }}
                      >
                        <img
                          src={Happy}
                          alt="격려하기"
                          style={{ marginRight: "4px" }}
                        />
                        격려하기
                      </Btn>
                    </BtnWrap>
                  </SoundBtn>
                </div>
              </DIV>
            </>
          )}
        </Background>
      ) : (
        modalOn && <RoomClickModalForLogin />
      )}
    </>
  );
};

const Background = styled.div`
  margin: 0px auto;
  overflow-x: hidden;
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
  z-index: 4;
  :after {
    border-top: 10px solid #0028fa;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid;
    content: "";
    position: absolute;
    bottom: -9px;
    left: 20px;
  }
`;

const DIV = styled.div`
  width: 100%;
  height: 100vh; //100vh
  padding-top: 64px;
  margin: 0px 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  @media screen and (max-width: 1440px) {
    padding-top: 56px;
  }
`;

const TimerWrap = styled.div`
  width: 1096px;
  margin: 40px 0px 0px 0px;
  display: flex;
  justify-content: center;
  text-align: center;
  @media screen and (max-width: 1440px) {
    position: relative;
    left: -110px;
  }
  @media screen and (max-width: 1194px) {
    position: relative;
    left: -110px;
  }
`;

const VideoWrap = styled.div`
  width: 1320px;
  height: 610px;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 10px;
  box-sizing: border-box;
  @media screen and (max-width: 1440px) {
    width: 980px;
    height: 605px;
    margin: auto;
  }
`;

const MainVideo = styled.div`
  width: 1096px;
  height: 500px; //추가
  border-radius: 12px;
  @media screen and (max-width: 1440px) {
    width: 758px;
    height: 426px;
    margin: 0px 0px 110px;
  }
  @media screen and (max-width: 1194px) {
    width: 758px;
    height: 426px;
    margin: 0px 0px 110px;
  }
`;

const SoundBtn = styled.div`
  width: 740px;
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  position: relative;
  border-radius: 4px;
  @media screen and (max-width: 1440px) {
    width: 758px;
    margin: -114px 0px 0px 54px;
  }
  @media screen and (max-width: 1194px) {
    width: 758px;
    margin: -140px 0px 0px 54px;
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
  font-size: 14px;
  border-radius: 4px;
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
export default React.memo(Detail);
