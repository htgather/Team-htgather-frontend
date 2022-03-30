import React from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import tablet from '../Images/tablet.json';
import tablet2 from '../Images/tablet2.png';

const TabletPortrait = (props) => {
  const lottieOptions = {
    animationData: tablet,
    loop: true,
    autoplay: true,
    background: 'transparent',
    speed: 0.5,
    rendererSettings: {
      className: 'animation', // svg에 적용
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <DIV>
      <Lottie options={lottieOptions} style={{ width: '460px', height: '460px' }}></Lottie>
      <TextWrap>
        <p>
          홈트게더는 가로 모드에서 이용할 수 있어요
          <br /> 태블릿을 돌려 가로로 이용해 주세요
        </p>
      </TextWrap>
    </DIV>
  );
};

const DIV = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* Portrait orientation */
  /* @media screen and (orientation: portrait) {
    display: flex; */
  }
  /* Landscape orientation */
  /* @media screen and (orientation: landscape) {
  } */
`;

const TextWrap = styled.div`
  margin-top: 80px;
  width: 38rem; //586px;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: -2%;
  line-height: 50px;
  text-align: center;
  z-index: 3;
`;

export default TabletPortrait;
