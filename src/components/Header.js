import React, { useState } from "react";
import styled from "styled-components";
import MoreInfoModal from "../components/modals/MoreInfoModal";
import MyInfoModal from "../components/modals/MyInfoModal";
import Icon_Menu from "../Images/Icon_Menu.png";
import User from "../Images/User.png";
import { history } from "../redux/configureStore";

const Header = () => {
  const isLocal = localStorage.getItem("isLogin") ? true : false;

  const [showModal, setShowModal] = React.useState(false);
  const [myModal, setMyModal] = React.useState(false);

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
        <p
          onClick={() => {
            history.push("/");
          }}
        >
          홈트게더
        </p>
        <div
          style={{
            width: "125px",
            paddingRight: "45px",
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {isLocal ? (
            <div>
              <div
                onClick={openMyInfoModal}
                style={{ cursor: "pointer", position: "relative" }}
              >
                <img src={User} />
              </div>
              {myModal && <MyInfoModal openMyInfoModal={openMyInfoModal} />}
            </div>
          ) : (
            ""
          )}

          {/* {showModal && <MoreInfoModal openModal={openModal} />} */}
          <div
            onClick={openModal}
            style={{ cursor: "pointer", position: "relative" }}
          >
            <div>
              <img src={Icon_Menu} />
            </div>
            {showModal && <MoreInfoModal openModal={openModal} />}
          </div>
        </div>
      </HeaderGrid>
    </HeaderContainer>
  );
};

const Test = styled.div`
  width: 300px;
  height: 300px;
  background-color: dimgray;
  position: absolute;
  right: 10px;
`;
const HeaderContainer = styled.div`
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
    width: 980px;
    padding: 1.2rem;
  }
`;
export default Header;
