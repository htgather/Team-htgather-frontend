import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';
import RoomCard from '../components/Card';
import RoomSectionTab from '../components/RoomSectionTab';
import MySection from '../components/MySection';
import RoomClickModal from '../components/modals/RoomClickModal';
import MobileLanding from '../components/MobileLanding';
import TabletPortrait from '../components/TabletPortrait';
import toTop from '../Images/toTop.svg';

import jwt_decode from 'jwt-decode';
import { actionCreators as roomActions } from '../redux/modules/room';
import { actionCreators as playerActions } from '../redux/modules/player';

const Main = (props) => {
  const dispatch = useDispatch();

  // 웹페이지에서 태블릿 세로만큼
  // const webPortrait = window.matchMedia('screen and (max-width: 820px');
  // 모바일 접속시
  const NewMedia = window.matchMedia('screen and (max-width:480px)');

  const roomList = useSelector((state) => state.room.list.filter((e) => e.isStart === false));
  const enteringList = useSelector((state) => state.room.list.filter((e) => e.isStart === true)); //확인
  const [isLoginModal, setIsLoginModal] = React.useState();

  // 위로가기 버튼 관련
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태

  const handleFollow = () => {
    setScrollY(window.scrollY);
  };

  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScrollY(0); // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  };

  React.useEffect(() => {
    ScrollY > 120 ? setBtnStatus(true) : setBtnStatus(false);
  }, [ScrollY]);

  React.useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  }, []);

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
      {NewMedia.matches ? (
        <MobileLanding /> // 모바일인지 여부확인 후 모바일랜딩 페이지
      ) : (
        <>
          <TabletPortrait />
          <Box>
            <Header />
            <Container>
              {isLoginModal && (
                <DIV setIsLoginModal={setIsLoginModal}>
                  <RoomClickModal setIsLoginModal={setIsLoginModal} />
                </DIV>
              )}
              <MySection></MySection>
              <RoomSection>
                <RoomSectionTab setIsLoginModal={setIsLoginModal}></RoomSectionTab>
                <RoomCardList>
                  {roomList.map((e, i) => (
                    <RoomCard key={i} roomInfo={e} setIsLoginModal={setIsLoginModal}></RoomCard>
                  ))}
                  <RoomCard last="last" setIsLoginModal={setIsLoginModal}></RoomCard>
                  {enteringList.map((e, i) => (
                    <RoomCard key={i} roomInfo={e} setIsLoginModal={setIsLoginModal} />
                  ))}
                </RoomCardList>
              </RoomSection>
              <ToTopBtn onClick={moveToTop}>
                <img src={toTop} alt="최상단 이동 버튼" className={BtnStatus ? 'topBtn active' : 'topBtn'} />
              </ToTopBtn>
            </Container>
          </Box>
        </>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const Box = styled.div`
  @media screen and (orientation: portrait) {
    display: none;
  }
  overflow-x: hidden;
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
  padding-bottom: 100px;
  /* @media screen and (max-width: 1023px) {
    width: 100vh;
  } */
`;

const RoomSection = styled.div`
  /* @media screen and (max-width: 1023px) {
    width: 100vh;
    height: 100vw;
    margin: 0px auto;
  } */
`;

const RoomCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 315px);
  grid-gap: 1.5rem;
  @media screen and (max-width: 1360px) {
    grid-template-columns: repeat(3, 315px);
  }
`;

const ToTopBtn = styled.div`
  position: fixed;
  right: 3.8rem;
  bottom: 30px;
  /* box-shadow: 1px 1px 6px 3px rgba(0, 0, 0, 0.3); */
  .topBtn {
    opacity: 0;
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
