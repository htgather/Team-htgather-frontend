import React from 'react';
import styled from 'styled-components';
import tablet2 from '../Images/tablet.png';

const TabletPortrait = (props) => {
  return (
    <DIV>
      <TabletImage />
      <TextWrap>
        홈트게더는 가로화면에 최적화되어있어요 <br />
        화면을 돌려 사용해주세요💡
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
  @media screen and (orientation: portrait) {
    display: flex;
  }
  /* Landscape orientation */
  @media screen and (orientation: landscape) {
    display: none;
  }
`;

const TabletImage = styled.div`
  width: 400px;
  height: 400px;
  background-color: #add;
  background: url(${tablet2});
  /* url('Images/tablet2.png'); */
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 40px;

  animation-name: rotate;
  animation-duration: 3s;
  animation-iteration-count: 3;
  animation-direction: normal; //alternate;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-90deg);
    }
  }
`;

const TextWrap = styled.div`
  text-align: center;
  z-index: 3;
`;

export default TabletPortrait;
