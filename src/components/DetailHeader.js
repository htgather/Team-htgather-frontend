import React, { useState } from 'react';
import styled from 'styled-components';
import ExitModal from '../components/modals/ExitModal';
import People from '../Images/People.png';

import { history } from '../redux/configureStore';

const Header = (props) => {
  //   const { roomInfo } = props;
  // {roomInfo.roomTitle}
  const [modalOn, setModalOn] = React.useState(false);

  const exitRoom = () => {
    setModalOn(!modalOn);
  };

  return (
    <HeaderContainer>
      <HeaderGrid>
        <RoomTitle>요기는 방제목 자리입니다</RoomTitle>
        <BtnWrap>
          {/* 나가기 */}
          <HeaderBtn onClick={exitRoom}>
            <BtnContents style={{ color: '#aeb5bc' }}>나가기</BtnContents>
            {modalOn && <ExitModal exitRoom={exitRoom} />}
          </HeaderBtn>

          {/*  인원수*/}
          <HeaderBtn>
            <BtnContents>
              <img src={People} alt="인원수" />
              <div style={{ color: '#aeb5bc' }}>1/5</div>
            </BtnContents>
          </HeaderBtn>
        </BtnWrap>
      </HeaderGrid>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #eaecef;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
const HeaderGrid = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1320px;
  & > p {
    color: #4a5056;
    font-size: 20px;
    font-weight: bold;
  }
  @media screen and (max-width: 1360px) {
    width: 980px;
    padding: 1.2rem;
  }
`;

const RoomTitle = styled.div`
  display: flex;
  align-items: center;
`;

const BtnWrap = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  position: relative;
  flex-direction: row-reverse;
`;
const HeaderBtn = styled.div`
  width: 92px;
  height: 40px;
  border: 1px solid #aeb5bc;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
`;

const BtnContents = styled.div`
  width: 92px;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  vertical-align: middle;
`;
export default Header;
