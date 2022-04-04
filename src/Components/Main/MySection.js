import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import clap from './Images/MySection_Clap.svg';

import Banner from './Banner';
import Calender from './Calender';
import jwt_decode from 'jwt-decode';
import MyPart from '../Modals/MyPart'; //로그인 안했을 때 가리는 모달
import MyRecord from './MyRecord';
import MostExercised from './MostExercised';
import Ranking from './Ranking';
import { actionCreators as myinfoActions } from '../../redux/modules/myinfo';

const MySection = () => {
  const dispatch = useDispatch();
  const myRecords = useSelector((state) => state.myinfo.myRecords);

  const is_local = localStorage.getItem('isLogin');
  const nickName = is_local ? jwt_decode(localStorage.getItem('isLogin')).nickName : false;

  React.useEffect(() => {
    if (nickName) {
      dispatch(myinfoActions.getRecordsDB());
    }
  }, []);

  return (
    <MySectionContainer>
      <MySectionTitle>
        <div
          style={{
            width: '24px',
            height: '25px',
            display: 'flex',
            alignItems: 'center',
            marginRight: '4px',
          }}
        >
          <img src={clap} alt="박수 아이콘" width="24" />
        </div>
        <div>{nickName ? `안녕하세요 ${nickName}님, 오늘도 함께 운동해요!` : '안녕하세요, 오늘도 함께 운동해요!'}</div>
      </MySectionTitle>
      <MySectionContent>
        <MyPart />
        <MyPage>
          <Ranking />
          <MyRecord myRecords={myRecords}></MyRecord>
          <Calender></Calender>
        </MyPage>
        <RightSection>
          <MostExercised myRecords={myRecords} />
          <Banner></Banner>
        </RightSection>
      </MySectionContent>
    </MySectionContainer>
  );
};

const MySectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1320px;
  align-items: center;
  margin: 56px auto 64px;
  color: rgb(34 37 41);
  @media screen and (max-width: 1360px) {
    width: 62rem;
    justify-content: center;
  }
  @media screen and (max-width: 1023px) {
    /* width: 65rem */
    /* width: 100vh; */
    /* padding: 0px 1rem; */
    /* display: none; */
  }
  position: relative;
`;

const MySectionTitle = styled.div`
  color: #222529;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.96pt;
  font-weight: 700;
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  margin-bottom: 30px;

  /* @media screen and (max-width: 1023px) {
    padding: 0 1rem;
  } */
`;

const MySectionContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  /* @media screen and (max-width: 1023px) {
    padding: 0 1rem;
  } */
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
    justify-content: space-evenly;
  }
  /* @media screen and (max-width: 1023px) {
    justify-content: space-between;
  } */
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
