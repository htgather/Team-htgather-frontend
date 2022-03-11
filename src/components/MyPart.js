import React, { useState } from "react";
import styled from "styled-components";
import lock from "../Images/lock.png";
import KakaoLogin from "../components/KakaoLogin";

const MyPart = () => {
  const is_local = localStorage.getItem("isLogin") ? true : false;

  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        {is_local ? (
          ""
        ) : (
          <DIV>
            <Container>
              <div>
                <img src={lock} width="48px" height="50px" />
              </div>
              <div style={{ marginTop: "20px", color: "#fff" }}>
                로그인 후에 이용해주세요
              </div>
              <BtnWrap>
                <KakaoLogin />
              </BtnWrap>
              {/* <LoginBtn>카카오 계정으로 시작하기</LoginBtn> */}
            </Container>
          </DIV>
        )}
      </div>
    </React.Fragment>
  );
};

const DIV = styled.div`
  width: 984px;
  height: 284px;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  position: absolute;
`;

const LoginDiv = styled.div`
  width: 984px;
  height: 284px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  background-color: #fff;
  border-radius: 12px;
`;

const Contents = styled.div`
  width: 328px;
  height: 284px;
`;
const Calendar = styled.div`
  width: 328px;
  height: 284px;
  /* background-color: #f2d2de; */
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;

const Unknown2 = styled.div`
  width: 328px;
  height: 284px;
  /* background-color: blue; */
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const Container = styled.div`
  margin: auto;
  text-align: center;
`;

const BtnWrap = styled.div`
  margin-top: 25px;
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

export default MyPart;