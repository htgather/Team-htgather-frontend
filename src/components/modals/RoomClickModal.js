import React, { useState } from 'react';
import styled from 'styled-components';

import KakaoLogin from '../KakaoLogin';
import loginImg from '../../Images/loginImg.png';
import lock from '../../Images/lock.png';
import Close from '../../Images/Close.png';
import Frame from '../../Images/Frame.png';

const RoomClickModal = (props) => {
  const is_local = localStorage.getItem('isLogin') ? true : false;

  const closeModal = () => {
    props.setIsLoginModal(false);
  };

  return (
    <React.Fragment>
      <BackGround onClick={closeModal}>
        <ModalContainer>
          <DIV onClick={(e) => e.stopPropagation()}>
            <ImgWrap>
              <img src={loginImg} />
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '20px' }}>홈트게더와 함께하는 홈 트레이닝</div>
              <div
                style={{
                  fontSize: '14px',
                  marginTop: '10px',
                  color: '#aaa',
                }}
              >
                혼자하는 홈트가 아닌 함께하는 홈트를 경험해보세요.
                <br />
                홈트게더와 함께 사람들과 소통하며 재미있는 홈트를 시작해보세요.
              </div>
            </ImgWrap>
            <CloseBtn onClick={closeModal}>
              <img src={Close} />
            </CloseBtn>
            <Container>
              <div>
                <img src={lock} width="48px" height="50px" />
              </div>
              <div style={{ marginTop: '20px', fontSize: '16px' }}>
                로그인 후에 확인할 수 있어요
                <br />
                3초 로그인하고 사람들과 함께 운동해볼까요?
              </div>
              <Kakao>
                <KakaoLogin />
              </Kakao>
            </Container>
          </DIV>
        </ModalContainer>
      </BackGround>
    </React.Fragment>
  );
};

const BackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  right: 50%;
  top: 55%;
  bottom: 50%;
  transform: translate(-50%, -50%);
  /* max-height: 80%; */
  width: 960px;
  height: 480px;
  text-align: center;
  z-index: 999;

  /* @media ${(props) => props.theme.device.MobileLandscape} {
    width: 90%; */
  /* } */
`;
const DIV = styled.div`
  background-color: #f1f3f5;
  border-radius: 12px;
  margin: auto;
  width: 880px;
  height: 480px;
  display: flex;
  justify-content: space-evenly;
  position: relative;
`;

const CloseBtn = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 28px;
  top: 25px;
  cursor: pointer;
`;

const ImgWrap = styled.div`
  width: 440px;
  background-color: #fff;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  padding: 75px 30px;
  letter-spacing: -0.48px;
`;

const Container = styled.div`
  margin: 155px auto;
  text-align: center;
`;

const Kakao = styled.div`
  margin-top: 30px;
`;

// const LoginBtn = styled.div`
//   display: inline-flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #ddd;
//   border-radius: 20px;
//   width: 316px;
//   height: 56px;
//   margin-top: 30px;
// `;
export default RoomClickModal;
