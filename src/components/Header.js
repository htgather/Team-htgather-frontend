import React from "react";
import styled from "styled-components";
import hamburger from "../Images/HeaderIcon_hamburger.png";
// 로그인테스트 _ 나중에 지우기
import instance from "../shared/Request";
import jwt_decode from "jwt-decode";
const Header = () => {
  const login = () => {
    instance
      .post("/users/auth", { nickName: "sangwon", snsId: 914914 })
      .then((response) => {
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <HeaderContainer>
      <HeaderGrid>
        <p onClick={login}>홈트게더</p>
        <img
          src={hamburger}
          alt="햄버거 아이콘"
          onClick={() => {
            const token = localStorage.getItem("token");
            const decoded = jwt_decode(token);
            console.log(decoded);
          }}
        />
      </HeaderGrid>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  height: 64px;
  background: #f8f9fa;
  border-bottom: 1px solid #eaecef;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeaderGrid = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1320px;
  & > p {
    color: #4a5056;
    font-size: 20px;
    font-weight: bold;
  }
  @media screen and (max-width: 1360px) {
    width: 980px;
  }
`;
export default Header;
