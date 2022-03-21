import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as commonActions } from '../redux/modules/common';

import gold from '../Images/gold.png';
import silver from '../Images/silver.png';
import bronze from '../Images/bronze.png';
import clap from '../Images/clap.png';
import fire from '../Images/fire.png';
import fighting from '../Images/fighting.png';

const Ranking = (props) => {
  const dispatch = useDispatch();

  const rankingList = useSelector((state) => state.User.ranking);
  const is_local = localStorage.getItem('isLogin');
  const nickName = is_local ? jwt_decode(localStorage.getItem('isLogin')).nickName : false;

  React.useEffect(() => {
    if (nickName) {
      dispatch(commonActions.getRecordsDB());
    }
    dispatch(userActions.getRankFB());
  }, []);

  return (
    <DIV>
      <Header>이번 주 운동 랭킹</Header>
      <RankContainer>
        {rankingList.map((p, i) => {
          // 랭킹 집계 전
          if (rankingList.length < 2) {
            if (p.isMe) {
              if (p.countPerWeek === 0) {
                return (
                  <DIV>
                    <Noti>
                      <TextWrap>
                        <strong>아직 랭킹이 집계되기 전입니다.</strong>
                        <br />
                        홈트게더를 이용하고 <br />
                        순위에 이름을 올려보세요!!
                        <br />
                      </TextWrap>
                    </Noti>
                  </DIV>
                );
              }
            }
          }

          // 내 기록이 0회일 때 혹은 랭킹이 5위 초과일때
          if (p.isMe) {
            if (p.countPerWeek === 0 || p.rank > 4) {
              return (
                <IsMeZero>
                  <Rank style={{ paddingLeft: p.rank > 9 ? '' : '2px' }}>{p.rank}</Rank>
                  <Name style={{ fontWeight: p.isMe ? 'bold' : '' }}>{p.isMe ? (nickName ? nickName : p.nickName) : p.nickName}</Name>
                  <Count>{p.countPerWeek}회</Count>
                </IsMeZero>
              );
            }
          }
          return (
            <OneRank
              key={i}
              style={{
                backgroundColor: p.isMe ? '#405EFB' : '',
                color: p.isMe ? '#fff' : '',
              }}
            >
              <Rank>
                {p.rank === 1 ? (
                  <img src={gold} alt="금메달" width="20" />
                ) : p.rank && p.rank === 2 ? (
                  <img src={silver} alt="은메달" width="20" />
                ) : p.rank && p.rank === 3 ? (
                  <img src={bronze} alt="동메달" width="20" />
                ) : (
                  p.rank
                )}
              </Rank>
              <Name style={{ fontWeight: p.isMe ? 'bold' : '' }}>{p.isMe ? (nickName ? nickName : p.nickName) : p.nickName}</Name>
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
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #222529;
  margin: 24px 0px 16px 24px;
  letter-spacing: -0.64px;
`;

const RankContainer = styled.div`
  width: 267px;
  height: 192px;
  display: grid;
  align-content: start;
  align-items: start;
  row-gap: 4px;
  margin: 0px 24px 24px 24px;
`;

const OneRank = styled.div`
  width: 267px;
  height: 36px;
  border-radius: 8px;
  background-color: #f1f3f5;
  display: flex;
  justify-content: space-between; //space-around;
  align-items: center;
  color: rgb(34, 37, 41);
  letter-spacing: -0.48px;
  /* padding: 0px 8px; */
`;

const Rank = styled.div`
  width: 25px;
  font-size: 16px;
  text-align: center;
  margin: 4px 0px 4px 15px;
`;

const Name = styled.div`
  width: 130px;
  height: 20px;
  /* display: flex; */
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-size: 14px;
  line-height: 20px;
  margin-left: 17px;
`;

const Count = styled.div`
  width: 50px;
  font-size: 15px;
  font-weight: 600;
  text-align: right;
  margin: 7px 12px 7px 0px;
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
  background-color: #405efb;
  color: #fff;
  position: absolute;
  bottom: 27px;
`;

const TextWrap = styled.div`
  text-align: center;
`;
export default Ranking;
