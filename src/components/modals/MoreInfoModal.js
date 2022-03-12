import React, { useState } from "react";
import styled from "styled-components";
import Close from "../../Images/Close.png";
import KakaoLogin from "../KakaoLogin";
const MyInfoModal = (props) => {
  const { openMyInfoModal } = props;

  const [MyModal, setMyModal] = useState(false);

  return (
    <React.Fragment>
      <DIV onClick={openMyInfoModal}>
        <CloseBtn>
          <img src={Close} alt="closeBtn" />
        </CloseBtn>
        <TextWrap style={{ fontSize: "25px" }}>더보기</TextWrap>
        <Line />
        <TextWrap style={{ fontSize: "17px" }}>고객 지원</TextWrap>
        <KakaoLogin></KakaoLogin>
        <div style={{ marginTop: "20px" }}>✍️홈트게더 이용 후기 남기기</div>
        <div style={{ marginTop: "10px" }}>😱오류, 버그 신고하기</div>
      </DIV>
    </React.Fragment>
  );
};

const DIV = styled.div`
  background-color: #fff;
  z-index: 999;
  width: 400px;
  height: 285px;
  border-radius: 12px;
  top: 45px;
  right: -20px;
  padding: 50px;
  position: absolute;
  :before {
    border-top: 0px solid;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
    content: "";
    position: absolute;
    top: -10px;
    right: 24px;
  }
  /* :after {
    border-top: 0px solid;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #ddd;
    content: '';
    position: absolute;
    top: -10px;
    right: 100px;
  } */
  box-shadow: rgba(100, 100, 111, 0.2) 0px 5px 15px 0px;
`;

const Line = styled.div`
  background-color: #eaecef;
  width: 320px;
  height: 1px;
  margin: 20px auto 30px;
`;

const TextWrap = styled.div`
  vertical-align: middle;
  font-weight: bold;
`;

const NickName = styled.div`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
`;

const NickChange = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
`;

const NickInput = styled.input`
  width: 232px;
  height: 40px;
  padding: 10px;
  border: 1px solid #f1f3f5;
  background-color: #f1f3f5;
  border-radius: 8px;
  margin-right: 15px;
  outline: none;
`;

const NickBtn = styled.div`
  width: 80px;
  height: 40px;
  font-weight: bold;
  border-radius: 8px;
  background-color: #4a5056;
  color: #fff;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CloseBtn = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 28px;
  top: 25px;
  cursor: pointer;
`;

const LogOutBtn = styled.div`
  width: 320px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid #aeb5bc;
  color: #aeb5bc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  position: absolute;
  bottom: 40px;
  cursor: pointer;
`;

export default MyInfoModal;
