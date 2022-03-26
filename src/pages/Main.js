import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import RoomCard from "../components/Card";
import RoomSectionTab from "../components/RoomSectionTab";
import MySection from "../components/MySection";
import RoomClickModal from "../components/modals/RoomClickModal";
import MobileLanding from "../components/MobileLanding";
import TabletPortrait from "../components/TabletPortrait";
import toTop from "../Images/toTop.png";
import jwt_decode from "jwt-decode";
import { actionCreators as roomActions } from "../redux/modules/room";
import { actionCreators as playerActions } from "../redux/modules/player";
import { Socket } from "socket.io-client";

const Main = (props) => {
  const dispatch = useDispatch();

  // 모바일일때

  const NewMedia = window.matchMedia("orientation: landscape)");
  const tablet = window.matchMedia("(orientation: portrait)");
  // Portrait 모드일 때 실행할 스크립트
  // 폭과 높이가 같으면 Portrait 모드로 인식돼요

  const roomList = useSelector((state) => state.room.list);
  const enteringList = roomList.filter((room) => room.isStart === false); //확인
  //  console.log(enteringList);
  // const enteringList = useSelector((state) => state.room.enteringList);
  // console.log(enteringList); // 처음엔 undefined, 버튼 클릭시 console 찍힘

  const nickName = localStorage.getItem("isLogin")
    ? jwt_decode(localStorage.getItem("isLogin")).nickName
    : false;

  const [isLoginModal, setIsLoginModal] = React.useState();
  // 위로가기 버튼 관련
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
  };

  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setScrollY(0); // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  };

  const [clickedEntering, setClickedEntering] = React.useState(false);

  const isEntering = () => {
    setClickedEntering(!clickedEntering);
    // dispatch(roomActions.EnteringRoomDB());
    // console.log(clickedEntering);
  };

  React.useEffect(() => {
    ScrollY > 120 ? setBtnStatus(true) : setBtnStatus(false);
  }, [ScrollY]);

  React.useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  // 방정보 리스트 불러오기
  React.useEffect(() => {
    dispatch(roomActions.getRoomDB());
    dispatch(
      playerActions.setPlayInfo({
        curYoutubeTime: 0,
      })
    );
  }, []);

  return (
    <Wrap>
      <div className="wrap">
        {/* {NewMedia.matches ? (
          <MobileLanding />
        ) : tablet.matches ? (
          <TabletPortrait />
        ) : ( */}
        <>
          <Header />
          <Container>
            {isLoginModal && (
              <DIV setIsLoginModal={setIsLoginModal}>
                <RoomClickModal setIsLoginModal={setIsLoginModal} />
              </DIV>
            )}
            <MySection></MySection>
            <RoomSection>
              <RoomSectionTab
                setIsLoginModal={setIsLoginModal}
                isEntering={isEntering}
              ></RoomSectionTab>
              <RoomCardList>
                {roomList.map((e, i) => (
                  <RoomCard
                    key={i}
                    roomInfo={e}
                    setIsLoginModal={setIsLoginModal}
                  ></RoomCard>
                ))}
                {enteringList.map((p, idx) => {
                  <RoomCard key={idx} roomInfo={p} />;
                })}
                <RoomCard
                  last="last"
                  setIsLoginModal={setIsLoginModal}
                ></RoomCard>
              </RoomCardList>
            </RoomSection>
            <ToTopBtn onClick={moveToTop}>
              <img
                src={toTop}
                alt="최상단 이동 버튼"
                className={BtnStatus ? "topBtn active" : "topBtn"}
              />
            </ToTopBtn>
          </Container>
        </>
        )}
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  .wrap {
    @media screen and (max-width: 1023px) {
      /* transform: rotate(90deg);
      width: 100vh;
      height: 100vw; */
      height: 100vw;

      padding: 0 auto;
    }
  }
`;

const DIV = styled.div`
  display: inline-flex;
  justify-content: center;
  margin: auto;
`;

const Container = styled.div`
  /* width: 100%;
  height: 100%; */
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* padding-bottom: 40px; */
  @media screen and (max-width: 1023px) {
    width: 100vh;
  }
`;

const RoomSection = styled.div`
  @media screen and (max-width: 1023px) {
    width: 100vh;
    height: 100vw;
    margin: 0px auto;
  }
`;

const RoomCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 315px);
  grid-gap: 1.5rem;
  @media screen and (max-width: 1360px) {
    grid-template-columns: repeat(3, 315px);
  }
  @media screen and (max-width: 1023px) {
    grid-gap: 15px;
    width: 100vh;
    padding-left: 1.4rem;
    /* background-color: #add; */
    display: none;
  }
`;

const ToTopBtn = styled.div`
  position: fixed;
  right: 3.8rem;
  bottom: 30px;
  /* box-shadow: 1px 1px 6px 3px rgba(0, 0, 0, 0.3); */
  .topBtn {
    opacity: 1;
    transition: opacity 0.17s ease-in;
  }
  .topBtn.active {
    z-index: 10;
    opacity: 1;
    cursor: pointer;
  }
  @media screen and (max-width: 1360px) {
    display: none;
  }
`;
export default Main;
