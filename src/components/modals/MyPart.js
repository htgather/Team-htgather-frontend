
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';

import clap from '../../Images/clap.png';

import Banner from '../Banner';
import Calender from '../Calender';

import MyPart from '../modals/MyPart'; //로그인 안했을 때 가리는 모달
import MyRecord from '../MyRecord';
import MostExercised from '../MostExercised';
import Ranking from '../Ranking';
import { actionCreators as commonActions } from '../../redux/modules/common';

const MyPart = () => {
  const is_local = localStorage.getItem("isLogin") ? true : false;

  return (
    <>
      {is_local ? (
        ""
      ) : (
        <DIV>
          <Container>
            <img src={lock} alt="자물쇠 아이콘" width="48" />
            <Text>로그인 후에 이용해주세요</Text>
            <LoginWithKakao />
          </Container>
        </DIV>
      )}
    </>
  );
};

const DIV = styled.div`
  width: 985px;
  height: 284px;
  background-color: rgba(34, 37, 41, 0.8);
  border-radius: 12px;
  position: absolute;
  left: 0px;
  z-index: 10;
  display: flex;
  justify-content: start;
  align-items: center;
  // @media screen and (max-width: 1360px) {
  //   width: 1000px;
  // }

const MySectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1320px;
  align-items: center;
  margin: 56px 0 64px 0;
  @media screen and (max-width: 1360px) {
    width: 985px;
    justify-content: center;
  }
  position: relative;
`;

const MySectionTitle = styled.div`
  color: #222529;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  margin-bottom: 30px;
  letter-spacing: -0.48px;
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    padding: 0rem 7.6rem;
  }
`;

const MySectionContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    padding: 0rem 7.6rem;
  }
`;
const MyPage = styled.div`
  width: 985px;
  height: 284px;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  @media screen and (max-width: 1360px) {
    width: 100%;
    justify-content: space-between;
  }
`;
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  justify-content: space-between;
  @media screen and (max-width: 1360px) {
    display: none;
  }
`;

export default MySection;
