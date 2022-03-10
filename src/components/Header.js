import React, { useState } from "react";
import styled from "styled-components";
import MoreInfoModal from "../components/MoreInfoModal";
import Icon_Menu from "../Images/Icon_Menu.png";
const Header = () => {
  const [showModal, setShowModal] = React.useState(false);
  const openModal = () => {
    setShowModal(true);
    console.log(showModal);
  };

  return (
    <HeaderContainer>
      <HeaderGrid>
        <p>홈트게더</p>
        <MoreInfoModal />
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
