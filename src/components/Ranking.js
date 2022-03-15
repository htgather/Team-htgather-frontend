import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

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
          console.log(p);
          console.log(i);
          // 내 기록이 0회일 때 혹은 다른 사람 랭킹 수가 3 이하일 때
          if (p.isMe) {
            if (p.countPerWeek === 0 || p.rank > 4) {
              // rankingList.length < 5
              return (
                <IsMeZero>
                  <Rank>{p.rank}</Rank>
                  <Name>{p.nickName}</Name>
                  <Count
                    style={{
                      marginRight: p.countPerWeek < 10 ? "-10px" : null,
                    }}
                  >
                    {p.countPerWeek}회
                  </Count>
                </IsMeZero>
              );
            }
          }
          return (
            <OneRank
              key={i}
              style={{
                backgroundColor: p.isMe ? "#0028fa" : "",
                color: p.isMe ? "#fff" : "",
                fontWeight: p.isMe ? "bold" : "",
              }}
            >
              <Rank>
                {p.rank === 1
                  ? "🥇"
                  : p.rank && p.rank === 2
                  ? "🥈"
                  : p.rank && p.rank === 3
                  ? "🥉"
                  : p.rank}
              </Rank>
              <Name>{p.nickName}</Name>
              <Count
                style={{ marginRight: p.countPerWeek < 10 ? "-10px" : null }}
              >
                {p.countPerWeek}회
              </Count>
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
  display: grid;
  align-content: start;
  align-items: start;
  row-gap: 5px;

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
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  color: rgb(34, 37, 41);
  letter-spacing: -0.64px;
`;

const Rank = styled.div`
  /* color: #878e95; */
  margin-left: 5px;
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
  bottom: 24px;
  font-weight: bold;
`;

const TextWrap = styled.div`
  text-align: center;
`;
export default Ranking;
