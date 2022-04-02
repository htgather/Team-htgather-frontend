import React, { useState, useEffect } from "react";

import styled from "styled-components";
import Close from "./Images/Close.svg";

import Lottie from "react-lottie";
import Trophy from "./Images/Trophy.json";

const CompleteModal = (props) => {
  // console.log("끝모달");

  const [isOpen, setIsOpen] = React.useState(true);
  const [count, setCount] = React.useState(5);
  const closeModal = () => {
    setIsOpen(false);
  };

  const lottieOptions = {
    animationData: Trophy,
    loop: true,
    autoplay: true,
    background: "transparent",
    speed: 0.5,
    rendererSettings: {
      className: "animation", // svg에 적용
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  React.useEffect(() => {
    const timeout = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
    return () => {
      clearInterval(timeout);
    };
  }, []);
  React.useEffect(() => {
    if (count === 0) {
      props.setIsDoneModal();
    }
  }, [count]);
  return (
    <>
      {isOpen && (
        <BackGround>
          <ModalWrap>
            <CloseBtn onClick={closeModal}>
              <img src={Close} alt="취소" />
            </CloseBtn>
            <Lottie
              options={lottieOptions}
              style={{ width: "300px", height: "300px" }}
            ></Lottie>
            {/* <div onClick={(e) => e.stopPropagation()}> */}
            <ModalContents>
              <div className="first">운동 끝! 오늘도 해냈어요!</div>
              <div className="second">
                방에 남아서 이야기를 나누거나, 메인페이지에서 운동 기록을 확인해
                보세요
              </div>
              <div className="third">{count}초 후에 창이 닫혀요</div>
            </ModalContents>
            {/* </div> */}
          </ModalWrap>
        </BackGround>
      )}
    </>
  );
};

const BackGround = styled.div`
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 100;
`;

const ModalWrap = styled.div`
  background-color: #fff;
  width: 660px;
  height: 519px;
  border-radius: 12px;
  position: fixed;
  text-align: center;
  left: 50%;
  right: 50%;
  top: 50%;
  bottom: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const CloseBtn = styled.div`
  width: 32px;
  height: 32px;
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 15;
  cursor: pointer;
`;

const ModalContents = styled.div`
  width: 661px;
  height: 358px;
  position: absolute;
  top: 0;
  .first {
    margin-top: 313px;
    font-size: 36px;
    font-weight: bold;
    line-height: 1.39;
    letter-spacing: -1.44px;
    text-align: center;
    color: #222529;
  }
  .second {
    margin-top: 12px;
    font-size: 16px;
    font-weight: normal;
    line-height: 1.5;
    letter-spacing: -0.64px;
    text-align: center;
    color: #878e95;
  }
  .third {
    margin-top: 80px;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.43;
    letter-spacing: -0.56px;
    text-align: center;
    color: #878e95;
  }
  .animation {
    position: absolute;
    top: 0;
    width: 50px;
    height: 50px;
  }
`;

export default CompleteModal;
