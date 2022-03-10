import React, { useState } from 'react';
import styled from 'styled-components';
import MoreInfoModal from '../components/MoreInfoModal';
import Icon_Menu from '../Images/Icon_Menu.png';
const Header = () => {
  const [showModal, setShowModal] = React.useState(false);
  const openModal = () => {
    setShowModal(true);
    console.log(showModal);
  };

  return (
    <HeaderContainer>
      <div>홈트게더</div>
      <MoreInfoModal />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 64px;
  background: #ddd;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
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
