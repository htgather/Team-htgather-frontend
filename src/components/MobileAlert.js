import React from 'react';
import styled from 'styled-components';
import mobileMode from '../Images/mobileMode.png';

const MobileAlert = () => {
  return (
    <DIV>
      <Contents>
        <img src={mobileMode} width="100%" />
        <LinkBtn
          onClick={() => {
            window.alert('링크 복사 될 예정');
          }}
        >
          홈트게더 링크 공유하기
        </LinkBtn>
      </Contents>
    </DIV>
  );
};

const DIV = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  /* padding-top: 5rem; */
  position: relative;
`;

const LinkBtn = styled.div`
  width: 21rem; //232px;
  height: 60px;
  border-radius: 8px;
  background-color: #0028fa;
  font-size: 16px;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  bottom: 4rem; //6rem;
`;

export default MobileAlert;
