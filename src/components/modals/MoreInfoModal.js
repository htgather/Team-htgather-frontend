import React, { useState } from "react";
import styled from "styled-components";
import Close from "./Images/Close.svg";

const MyInfoModal = (props) => {
  const [MyModal, setMyModal] = useState(false);

  const onClickClose = () => {
    setMyModal(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <DIV>
        <CloseBtn>
          <img src={Close} alt="closeBtn" onClick={onClickClose} />
        </CloseBtn>
        <div onClick={(e) => e.stopPropagation()}>
          <Title>더보기</Title>
          <Line />
          <TextWrap>고객 지원</TextWrap>
          <DESC>
            <div
              style={{ marginBottom: "12px" }}
              onClick={() => {
                window.open("https://forms.gle/Shna39cfEnXqkLfu6", "_blank");
              }}
            >
              ✍️ 홈트게더 이용 후기 남기기
            </div>
            <div
              onClick={() => {
                window.open("https://forms.gle/ympKY1rVpspLX1Ut8", "_blank");
              }}
            >
              😱 오류, 버그 신고하기
            </div>
          </DESC>
        </div>
      </DIV>
    </div>
  );
};

const DIV = styled.div`
  background-color: #fff;
  color: rgb(34, 37, 41);
  z-index: 30;
  width: 400px;
  height: 284px;
  border-radius: 12px;
  top: 2.4rem;
  right: -1.3rem;
  padding: 40px;
  position: absolute;
  :before {
    border-top: 0px solid;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
    content: "";
    position: absolute;
    top: -0.6rem;
    right: 1.4rem;
  }
  box-shadow: rgba(100, 100, 111, 0.2) 0px 5px 15px 0px;
`;

const Line = styled.div`
  background-color: #eaecef;
  width: 320px;
  height: 1px;
  margin-top: 27px;
`;

const Title = styled.div`
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.96px;
  font-weight: bold;
`;

const TextWrap = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.72px;
  margin: 40px 0 16px;
`;

const DESC = styled.div`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.64pt;
  /* margin-bottom: 12px; */
  a {
    text-decoration-line: none;
  }
  a:link,
  a:visited {
    color: rgb(34, 37, 41);
  }
`;

const Login = styled.div`
  position: absolute;
  bottom: 33px;
  display: flex;
  left: 75px;
`;

const CloseBtn = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 28px;
  top: 25px;
  cursor: pointer;
`;

export default MyInfoModal;
