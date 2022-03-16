import React, { useState } from 'react';
import styled from 'styled-components';
import lock from '../../Images/lock.png';
import LoginWithKakao from '../KakaoLogin';

const MyPart = () => {
  const is_local = localStorage.getItem('isLogin') ? true : false;

  return (
    <>
      {is_local ? (
        ''
      ) : (
        <DIV>
          <Container>
            <img src={lock} alt="자물쇠 아이콘" />
            <Text>로그인 후에 이용해주세요</Text>
            <LoginWithKakao />
          </Container>
        </DIV>
      )}
    </>
  );
};

const DIV = styled.div`
  width: 965px;
  height: 284px;
  background-color: rgba(34, 37, 41, 0.8);
  border-radius: 12px;
  position: absolute;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Text = styled.div`
  margin: 14px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
`;

export default MyPart;
