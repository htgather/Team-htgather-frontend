import React, { useState } from "react";
import styled from "styled-components";

import KakaoLogin from "../Common/Functions/KakaoLogin";
import loginImg from "./Images/LoginImg.svg";
import lock from "./Images/Lock.svg";
import Close from "./Images/Close.svg";

const RoomClickModal = (props) => {
  const is_local = localStorage.getItem("isLogin") ? true : false;

  const closeModal = () => {
    props.setIsLoginModal(false);
  };

  return (
    <React.Fragment>
      <BackGround onClick={closeModal}>
        <ModalContainer>
          <DIV onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={closeModal}>
              <img src={Close} />
            </CloseBtn>
            <LeftSide>
              <ImgWrap>
                <img
                  src={loginImg}
                  alt="운동하는 사람들"
                  style={{ width: "274px", height: "208px" }}
                />
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginTop: "22px",
                  }}
                >
                  홈트게더와 함께하는 홈 트레이닝
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    marginTop: "28px",
                    color: "#aaa",
                  }}
                >
                  혼자하는 홈트가 아닌 함께하는 홈트를 경험해보세요.
                  <br />
                  홈트게더와 함께 사람들과 소통하며 재미있는 홈트를
                  시작해보세요.
                </div>
              </ImgWrap>
            </LeftSide>
            <RightSide>
              <Container>
                <LockImage />
                <TextWrap>
                  로그인 후에 확인할 수 있어요
                  <br />
                  3초 로그인하고 사람들과 함께 운동해볼까요?
                </TextWrap>
                <KakaoLogin />
              </Container>
            </RightSide>
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
  /* @media screen and (max-width: ) {
    width: 100vh;
    height: 1000vw;
  } */
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  right: 50%;
  top: 55%;
  bottom: 50%;
  transform: translate(-50%, -50%);
  width: 960px;
  height: 480px;
  text-align: center;
  z-index: 999;
  @media screen and (max-width: 1023px) {
  }
`;
const DIV = styled.div`
  background-color: #f1f3f5;
  border-radius: 12px;
  margin: auto;
  width: 960px;
  height: 480px;
  display: flex;
  justify-content: space-evenly;
  position: relative;
`;

const LeftSide = styled.div`
  width: 480px;
  height: 480px;
  background-color: #fff;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;

const ImgWrap = styled.div`
  width: 397px;
  height: 340px;
  letter-spacing: -0.96px;
  margin: 60px auto 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RightSide = styled.div`
  width: 480px;
  height: 480px;
`;

const LockImage = styled.div`
  width: 96px;
  height: 80px;
  background-image: url(${lock});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 305px; // 글씨기준 width. 원래 전체 div는 259px;
  height: 224px;
  margin: 128px 88px;
`;

const TextWrap = styled.div`
  height: 52px;
  margin: 16px 0px 28px;
  font-size: 18px;
  letter-spacing: -0.58px;
  line-height: 1.5;

  /* margin: '16px auto 28px', fontSize: '18px', width: '305px', height: '52px', lineHeight: '52px' */
`;

const CloseBtn = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 28px;
  top: 25px;
  cursor: pointer;
`;

export default RoomClickModal;
