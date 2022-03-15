import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import gold from '../Images/gold.png';
import silver from '../Images/silver.png';
import bronze from '../Images/bronze.png';

const Ranking = (props) => {
  const dispatch = useDispatch();

  const rankingList = useSelector((state) => state.User.ranking);

  React.useEffect(() => {
    dispatch(userActions.getRankFB());
  }, []);

  // 랭킹 집계 전 (랭킹 개수 0일 때)
  if (rankingList.length === 0) {
    <DIV>
      <Header>이번 주 운동 랭킹</Header>
      <Noti>
        <TextWrap>
          <strong>아직 랭킹이 집계되기 전입니다.</strong>
          <br />
          홈트게더를 이용하고 <br />
          순위에 이름을 올려보세요!!
          <br />
        </TextWrap>
      </Noti>
    </DIV>;
  }

  return (
    <DIV>
      <Header>이번 주 운동 랭킹</Header>
      <RankContainer>
        {rankingList.map((p, i) => {
          // 내 기록이 0회일 때 혹은 다른 사람 랭킹 수가 3 이하일 때
          if (p.isMe) {
            if (p.countPerWeek === 0 || p.rank > 4) {
              return (
                <IsMeZero>
                  <Rank>{p.rank}</Rank>
                  <Name style={{ fontWeight: p.isMe ? 'bold' : '' }}>{p.nickName}</Name>
                  <Count style={{ paddingLeft: p.isMe ? ' 0px 9px' : null }}>{p.countPerWeek}회</Count>
                </IsMeZero>
              );
            }
          }
          return (
            <OneRank
              key={i}
              style={{
                backgroundColor: p.isMe ? '#0028fa' : '',
                color: p.isMe ? '#fff' : '',
              }}
            >
              <Rank>
                {p.rank === 1 ? <img src={gold} alt="금메달" /> : p.rank && p.rank === 2 ? <img src={silver} alt="은메달" /> : p.rank && p.rank === 3 ? <img src={bronze} alt="동메달" /> : p.rank}
              </Rank>
              <Name style={{ fontWeight: p.isMe ? 'bold' : '' }}>{p.nickName}</Name>
              <Count>{p.countPerWeek}회</Count>
            </OneRank>
          );
        })}
      </RankContainer>
    </DIV>
  );
};

const DIV = styled.div`
  width: 315px;
  height: 284px;
  border-radius: 12px;
  padding: 20px 10px;
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #222529;
  margin: 0px 0px 15px;
  letter-spacing: -0.64px;
`;

const RankContainer = styled.div`
  width: 267px;
  height: 196px;
  display: grid;
  align-content: start;
  align-items: start;
  row-gap: 4px;

  /* display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative; */
`;

const OneRank = styled.div`
  width: 267px;
  height: 36px;
  border-radius: 8px;
  background-color: #f1f3f5;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: rgb(34, 37, 41);
  letter-spacing: -0.64px;
  padding: 0px 8px;
`;

const Rank = styled.div`
  width: 20px;
  font-size: 16px;
  text-align: center;
`;

const Name = styled.div`
  width: 130px;
  display: flex;
  text-align: left;
  font-size: 16px;
`;

const Count = styled.div`
  width: 50px;
  font-size: 17px;
  font-weight: 600;
  text-align: right;
`;

//집계 0일때
const Noti = styled(OneRank)`
  width: 267px;
  height: 196px;
  display: inline-flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const IsMeZero = styled(OneRank)`
  background-color: #0028fa;
  color: #fff;
  position: absolute;
  bottom: 27px;
  padding-left: 9px; // 세자리수일 때 확인 필요
`;

const TextWrap = styled.div`
  text-align: center;
`;
export default Ranking;
