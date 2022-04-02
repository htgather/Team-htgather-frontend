import React from "react";
import styled from "styled-components";

import { Progress } from "antd";
import "antd/dist/antd.less";

import fire from "./Images/Fire.svg";
import clock from "./Images/Clock.svg";

const MyRecord = (props) => {
  const {
    myRecords: {
      // 각 값의 디폴트값_ 구조분해할당
      countPerWeek = 1,
      weeklyGoal = 3,
      daysInARow = 38,
      totalTimePerWeek = 40,
    } = {},
  } = props;

  const per = Math.floor((countPerWeek / weeklyGoal) * 100);

  return (
    <DIV>
      <Header>이만큼 운동했어요</Header>
      <MyRecordContent>
        <div style={{ position: "relative" }}>
          <Progress
            type="circle"
            percent={per}
            showInfo={false}
            width={144}
            trailColor="#EAECEF"
            strokeColor="#405EFB"
          />
          <div className="progressInTextBox">
            <div className="countPerWeekText">{countPerWeek}일</div>
            <div className="weeklyGoalText">이번주 목표 {weeklyGoal}일</div>
          </div>
        </div>

        <BottomTextContainer>
          <div className="bottomTextBox">
            <img
              src={fire}
              alt="불꽃 아이콘"
              style={{ width: "14px", margin: "0px 2px 1px 0px" }}
            />
            <div>
              연속&nbsp; <span className="bold">{daysInARow}</span>일째
              운동중이에요
            </div>
          </div>

          <div style={{ marginTop: "4px" }} className="bottomTextBox">
            <img
              src={clock}
              alt="시계 아이콘"
              style={{ width: "14px", margin: "0px 2px 2px 0px" }}
            />
            <div>
              이번 주에&nbsp;<span className="bold">{totalTimePerWeek}</span>분
              운동했어요
            </div>
          </div>
        </BottomTextContainer>
      </MyRecordContent>
    </DIV>
  );
};

const DIV = styled.div`
  width: 315px;
  height: 284px;
  border-radius: 12px;
  /* @media screen and (max-width: 1023px) {
    width: 30vh;
  } */
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #222529;
  margin: 24px 0px 16px 24px;
  letter-spacing: -0.64px;
  line-height: 24px;
`;

const MyRecordContent = styled.div`
  width: 159px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 77px 20px 79px;
  * {
    font-size: 14px;
    font-weight: 400;
    color: #4a5056;
  }
  .progressInTextBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 32%; // 2.77rem;
    left: 26%; //2.4rem;
  }
  .countPerWeekText {
    font-size: 24px;
    line-height: 34px;
    color: #222529;
    font-weight: bold;
    letter-spacing: -0.96pt;
  }
  .weeklyGoalText {
    font-size: 12px;
    line-height: 20px;
    letter-spacing: -0.48pt;
    color: #aeb5bc;
    font-size: 12px;
  }
  .bold {
    font-weight: bold;
  }
  @media screen and (max-width: 1023px) {
    margin: 0 auto;
  }
`;

const BottomTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 12px;
  letter-spacing: -0.56pt;
  .bottomTextBox {
    width: 159px;
    height: 20px;
    letter-spacing: -1.1px;
    line-height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default MyRecord;
