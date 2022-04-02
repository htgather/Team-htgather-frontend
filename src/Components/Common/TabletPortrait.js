import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import tablet from "./Images/Tablet.json";

const TabletPortrait = (props) => {
  const lottieOptions = {
    animationData: tablet,
    loop: true,
    autoplay: true,
    background: "transparent",
    speed: 0.6,
    rendererSettings: {
      className: "animation", // svg에 적용
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <DIV>
      <PortraitBackground>
        <Lottie
          options={lottieOptions}
          style={{ width: "460px", height: "460px" }}
        ></Lottie>
        <TextWrap>
          <div>
            홈트게더는 가로 모드에서 이용할 수 있어요
            <br /> 태블릿을 돌려 가로로 이용해 주세요
          </div>
        </TextWrap>
      </PortraitBackground>
    </DIV>
  );
};

const DIV = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 999;
  /* Portrait orientation */
  @media screen and (orientation: portrait) {
    display: flex;
  }
  /* Landscape orientation */
  @media screen and (orientation: landscape) {
    display: none;
  }
`;
const PortraitBackground = styled.div`
  background: #fff;
  height: 100vh;
  width: 100vw;
  z-index: 998;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextWrap = styled.div`
  margin-top: 80px;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: -2%;
  line-height: 50px;
  text-align: center;
  z-index: 3;
`;

export default TabletPortrait;
