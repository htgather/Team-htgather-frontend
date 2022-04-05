import react from "react";
import styled from "styled-components";

import Footer_Copy from "./Images/Footer_Copy.svg";
import Footer_logo from "./Images/Footer_logo.svg";

const Footer = () => {
  return (
    <FooterWrap>
      <FooterGrid>
        <FooterLogo />
        <MiddleButtons>
          <div
            style={{ cursor: "pointer" }}
            // onClick={() => {
            //   // window.open("https://github.com/htgather");
            // }}
          >
            공지사항
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              window.open(
                "https://iridescent-pin-665.notion.site/HTGATHER-0b374c797efc4c28a1683b8b20a0f87f"
              );
            }}
          >
            팀 소개
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              window.open("https://www.instagram.com/htgather/");
            }}
          >
            인스타그램
          </div>
        </MiddleButtons>
        <CopyRight>Copyrightⓒ2022 Team Htgather All rights reserved</CopyRight>
      </FooterGrid>
    </FooterWrap>
  );
};

const FooterWrap = styled.div`
  width: 100vw;
  height: 120px;
  background-color: #f1f3f5;
  padding: 44px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #eaecef;
`;

const FooterGrid = styled.div`
  width: 1320px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1360px) {
    width: 990px;
  }
`;

const FooterLogo = styled.div`
  width: 130px;
  height: 32px;
  background-image: url(${Footer_logo});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const MiddleButtons = styled.div`
  width: 335px;
  color: #aeb5bc;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.52pt;
  font-weight: bold;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CopyRight = styled.div`
  width: 254px;
  color: #aeb5bc;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -0.48pt;
  text-align: right;
`;

export default Footer;
