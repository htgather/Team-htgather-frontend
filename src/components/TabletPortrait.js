import React from "react";
import styled from "styled-components";

import Lottie from "react-lottie";
import Trophy from "../Images/Trophy.json";

const TabletPortrait = (props) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [count, setCount] = React.useState(3);
  // const closeModal = () => {
  //   setIsOpen(false);
  // };
  const lottieOptions = {
    animationData: Trophy,
    // loop: true,
    autoplay: true,
    background: "transparent",
    speed: 5,
    rendererSettings: {
      className: "animation", // svg에 적용
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  React.useEffect(() => {
    const timeout = setInterval(() => {
      setCount((count) => count - 1);
    }, 10000);
    return () => {
      clearInterval(timeout);
    };
  }, []);
  // React.useEffect(() => {
  //   if (count === 0) {
  //     props.setIsDoneModal();
  //   }
  // }, [count]);
  return (
    <DIV>
      <TextWrap>
        <Lottie
          options={lottieOptions}
          style={{ width: "300px", height: "300px" }}
        ></Lottie>
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
  background-color: #add;
  z-index: 999;
  ${"" /* display: flex; */}
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

const TextWrap = styled.div`
  text-align: center;
`;

export default TabletPortrait;
