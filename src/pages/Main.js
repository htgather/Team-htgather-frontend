import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';
import RoomCard from '../components/Card';
import RoomSectionTab from '../components/RoomSectionTab';
import MySection from '../components/MySection';
import RoomClickModal from '../components/modals/RoomClickModal';
// import ScrollToTop from '../components/ScrollToTop';
import toTop from '../Images/toTop.png';
import jwt_decode from 'jwt-decode';
import { actionCreators as roomActions } from '../redux/modules/room';
import { Socket } from 'socket.io-client';

const Main = () => {
  const dispatch = useDispatch();

  const [isLoginModal, setIsLoginModal] = React.useState();

  const roomList = useSelector((state) => state.room.list);

  const nickName = localStorage.getItem('isLogin') ? jwt_decode(localStorage.getItem('isLogin')).nickName : false;

  // 위로가기 버튼 관련
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
  };

  React.useEffect(() => {
    ScrollY > 120 ? setBtnStatus(true) : setBtnStatus(false);
  }, [ScrollY]);

  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScrollY(0); // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });

  // 방정보 리스트 불러오기
  React.useEffect(() => {
    dispatch(roomActions.getRoomDB());
  }, []);

  return (
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
          <RoomSectionTab setIsLoginModal={setIsLoginModal}></RoomSectionTab>
          <RoomCardList>
            {roomList.map((e, i) => (
              <RoomCard key={i} roomInfo={e} setIsLoginModal={setIsLoginModal}></RoomCard>
            ))}
            <RoomCard last="last" setIsLoginModal={setIsLoginModal}></RoomCard>
          </RoomCardList>
        </RoomSection>
        <ToTopBtn onClick={moveToTop}>
          <img src={toTop} alt="최상단 이동 버튼" className={BtnStatus ? 'topBtn active' : 'topBtn'} />
        </ToTopBtn>
      </Container>
    </>
  );
};

const DIV = styled.div`
  display: inline-flex;
  justify-content: center;
  margin: auto;
`;

const Container = styled.div`
  width: 100%;
  /* height: 100%; */
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;
`;

const RoomSection = styled.div``;

const RoomCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 315px);
  grid-gap: 20px;
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
