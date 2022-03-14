import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';
import RoomCard from '../components/Card';
import RoomSectionTab from '../components/RoomSectionTab';
import MySection from '../components/MySection';
import RoomClickModal from '../components/modals/RoomClickModal';
import jwt_decode from 'jwt-decode';
import { actionCreators as roomActions } from '../redux/modules/room';

const Main = () => {
  const dispatch = useDispatch();

  const [isLoginModal, setIsLoginModal] = React.useState();

  const roomList = useSelector((state) => state.room.list);

  const nickName = localStorage.getItem('isLogin') ? jwt_decode(localStorage.getItem('isLogin')).nickName : false;

  React.useEffect(() => {
    // 방정보 리스트 불러오기
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
  height: 100%;
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

export default Main;
