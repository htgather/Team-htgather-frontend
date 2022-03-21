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

const MySection = () => {
  const dispatch = useDispatch();
  const myRecords = useSelector((state) => state.common.myRecords);

  const is_local = localStorage.getItem('isLogin');
  const nickName = is_local ? jwt_decode(localStorage.getItem('isLogin')).nickName : false;

  React.useEffect(() => {
    if (nickName) {
      dispatch(commonActions.getRecordsDB());
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
