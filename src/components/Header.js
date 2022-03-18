import React, { useState } from 'react';
import styled from 'styled-components';
import MoreInfoModal from '../components/modals/MoreInfoModal';
import MyInfoModal from '../components/modals/MyInfoModal';
import Logo from '../Images/Logo.svg';
import Icon_Menu from '../Images/Icon_Menu.png';
import CardIcon_person from '../Images/CardIcon_person.png';
import { history } from '../redux/configureStore';

const Header = (props) => {
  const isLocal = localStorage.getItem('isLogin') ? true : false;

  const [showModal, setShowModal] = React.useState(false);
  const [myModal, setMyModal] = React.useState(false);

  const [isWorkOut, setIsWorkOut] = React.useState(true);

  const openModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      setMyModal(false);
    }
  };

  const openMyInfoModal = () => {
    setMyModal(!myModal);
    if (!myModal) {
      setShowModal(false);
    }
  };

  return (
    <HeaderContainer>
      <HeaderGrid>
        <img
          src={Logo}
          alt="홈트게더 로고"
          style={{ width: '130px', height: '32px' }}
          onClick={() => {
            history.push('/');
          }}
        />

        <div
          style={{
            width: '80px',
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
            flexDirection: 'row-reverse',
          }}
        >
          <div onClick={openModal} style={{ cursor: 'pointer', position: 'relative' }}>
            <div>
              <img src={Icon_Menu} />
            </div>
            {showModal && <MoreInfoModal openModal={openModal} />}
          </div>

          {isLocal ? (
            <div>
              <div>
                <div onClick={openMyInfoModal} style={{ cursor: 'pointer', position: 'relative' }}>
                  <img src={CardIcon_person} />
                </div>
                {myModal && <MyInfoModal openMyInfoModal={openMyInfoModal} />}
              </div>
            </div>
          ) : null}
        </div>
      </HeaderGrid>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100vw;
  height: 64px;
  background: #f8f9fa;
  border-bottom: 1px solid #eaecef;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
const HeaderGrid = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1320px;
  /* min-width: 980px; */
  & > p {
    color: #4a5056;
    font-size: 20px;
    font-weight: bold;
  }
  @media screen and (max-width: 1360px) {
    width: 990px;
  }
`;
export default Header;
