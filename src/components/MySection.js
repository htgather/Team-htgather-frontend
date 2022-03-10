import React from 'react';
import styled from 'styled-components';
import clap from '../Images/MySectionIcon_clap.png';
import Banner from './Banner';
import Calender from './Calender';
const MySection = () => {
  return (
    <MySectionContainer>
      <MySectionTitle>
        <img src={clap} alt="박수 아이콘" style={{ marginRight: '4px' }} />
        안녕하세요 00님, 오늘도 함께 운동해요!
      </MySectionTitle>
      <MySectionContent>
        <MyPage>
          <Calender></Calender>
        </MyPage>
        <Banner></Banner>
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
    width: 1000px;
  }
`;

const MySectionTitle = styled.div`
  color: #222529;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  margin-bottom: 32px;
`;

const MySectionContent = styled.div`
  display: flex;
`;
const MyPage = styled.div`
  width: 985px;
  height: 284px;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
  padding: 24px;
  // background-color: rgba(34, 37, 41, 0.8);
`;

export default MySection;
