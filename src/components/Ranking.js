import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

const Ranking = (props) => {
  const dispatch = useDispatch();

  const rankingList = useSelector((state) => state.User.ranking);

  if (rankingList.length === 0) {
  }

  React.useEffect(() => {
    dispatch(userActions.getRankFB());
  }, []);

  return (
    <DIV>
      <Header>이번 주 운동 랭킹</Header>
      <RankContainer>
        {rankingList.map((p, i) => {
          // 랭킹 집계 전
          if (i.length == 0) {
            return (
              <>
                <OneRank>
                  <div>아직 랭킹이 집계되기 전입니다. 홈트게더를 이용하고 순위에 이름을 올려보세요!😉</div>
                </OneRank>
              </>
            );
          }
          return (
            <OneRank key={i} style={{ backgroundColor: p.isMe ? '#0028fa' : '', color: p.isMe ? '#fff' : '', fontWeight: p.isMe ? 'bold' : '' }}>
              {/* {p.isMe === true ? '랄라' : ''} */}
              <Rank>{p.rank === 1 ? '🥇' : p.rank && p.rank === 2 ? '🥈' : p.rank && p.rank === 3 ? '🥉' : p.rank}</Rank>
              <Name>{p.nickName}</Name>
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
  /* border: 1px solid #ddd; */
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #222529;
  margin: 0px 0px 20px;
  letter-spacing: -0.64px;
`;

const RankContainer = styled.div`
  width: 267px;
  height: 196px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const OneRank = styled.div`
  width: 267px;
  height: 36px;
  border-radius: 8px;
  background-color: #f1f3f5;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  color: rgb(34, 37, 41);
  letter-spacing: -0.64px;
`;

const Rank = styled.div`
  /* color: #878e95; */
`;

const Name = styled.div`
  width: 130px;
  display: flex;
  text-align: left;
`;

const Count = styled.div`
  width: 35px;
  font-size: 17px;
  font-weight: 600;
  /* #4a5056; */
`;

// const Me = styled(OneRank)`
//   background-color: #0028fa;
//   color: #fff;
// `;
export default Ranking;
