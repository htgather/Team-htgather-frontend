import React from 'react';
import styled from 'styled-components';
import RoomClickModal from './RoomClickModal';
import person from '../Images/CardIcon_person.png';
const Card = () => {
  return (
    <CardContainer onClick={RoomClickModal}>
      <CardImg></CardImg>
      <CardContent>
        <div>
          <CardTag>초보</CardTag>
          <CardTag>타이틀</CardTag>
        </div>
        <CardTitle>타바타 여신 김쌤 모시고 합니다 이것은 방제목이고, 두줄까지 가능합니다.</CardTitle>
        <CardInfo>
          <p>오후 8시 시작</p>
          <div className="cardInfo_personBox">
            <img src={person} alt="사람 아이콘" style={{ marginRight: '6px' }} />
            <p>2 / 6</p>
          </div>
        </CardInfo>
      </CardContent>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 315px;
  height: 332px;
  border-radius: 16px;
  background: #ffffff;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
    transition: transform 0.4s, translateY ease-out;
  }
  letter-spacing: -0.04em;
`;

const CardImg = styled.div`
  background-image: url('https://i.ytimg.com/vi/1W9gMxLoW6Q/hqdefault.jpg');
  padding-top: 54%;
  background-size: cover;
  background-position: center;
  border-radius: 16px 16px 0px 0px;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CardTag = styled.div`
  display: inline-block;
  padding: 4px 8px;
  background: #eaecef;
  color: #4a5056;
  border-radius: 4px;
  margin-right: 12px;
  font-size: 12px;
`;
const CardTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin: 12px 0px;
  height: 48px;
  line-height: 24px;
`;
const CardInfo = styled.div`
  font-size: 14px;
  margin-top: 28px;
  display: flex;
  justify-content: space-between;
  color: #000000;
  font-weight: 400;
  .cardInfo_personBox {
    display: flex;
    color: #4a5056;
`;

export default Card;
