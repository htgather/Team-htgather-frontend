import React, { useState } from 'react';
import lock from '../Images/lock.png';
import Close from '../Images/Close.png';
import styled from 'styled-components';

const RoomClickModal = (props) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <button onClick={openModal}>모달 오픈</button>

      {showModal ? (
        <div style={{ zIndex: '100' }}>
          <BackGround onClick={closeModal}>
            <ModalContainer>
              <DIV onClick={(e) => e.stopPropagation()}>
                <ImgWrap>이미지</ImgWrap>
                <CloseBtn onClick={closeModal}>
                  <img src={Close} />
                </CloseBtn>
                <Container>
                  <div>
                    <img src={lock} width="48px" height="50px" />
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    로그인 후에 확인할 수 있어요
                    <br />
                    3초 로그인하고 사람들과 함께 운동해볼까요?
                  </div>
                  <LoginBtn>카카오 계정으로 시작하기</LoginBtn>
                </Container>
              </DIV>
            </ModalContainer>
          </BackGround>
        </div>
      ) : null}
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
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  right: 50%;
  top: 50%;
  bottom: 50%;
  transform: translate(-50%, -50%);
  max-height: 80%;
  width: 20rem;
  height: 80%;
  text-align: center;

  @media ${(props) => props.theme.device.MobileLandscape} {
    width: 90%;
  }
`;
const DIV = styled.div`
  background-color: #fff;
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
  background-color: #ddd;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;

const Container = styled.div`
  margin: auto;
  text-align: center;
`;

const LoginBtn = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  border-radius: 20px;
  width: 316px;
  height: 56px;
  margin-top: 30px;
`;
export default RoomClickModal;
