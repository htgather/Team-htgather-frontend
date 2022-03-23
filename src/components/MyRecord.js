import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commonActions } from '../redux/modules/common';

import { Progress } from 'antd';
import 'antd/dist/antd.less';

import fire from '../Images/fire.png';
import clock from '../Images/clock.png';

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
        <div style={{ position: 'relative' }}>
          <Progress type="circle" percent={per} showInfo={false} width={144} trailColor="#EAECEF" strokeColor="#405EFB" />
          <div className="progressInTextBox">
            <div className="countPerWeekText">{countPerWeek}일</div>
            <div className="weeklyGoalText">이번주 목표 {weeklyGoal}일</div>
          </div>
        </div>

        <BottomTextContainer>
          <div className="bottomTextBox">
            <img src={fire} alt="불꽃 아이콘" style={{ width: '14px', margin: '0px 2px 1px 0px' }} />
            <div>
              연속&nbsp; <span className="bold">{daysInARow}</span>일째 운동중이에요
            </div>
          </div>

          <div style={{ marginTop: '4px' }} className="bottomTextBox">
            <img src={clock} alt="시계 아이콘" style={{ width: '14px', margin: '0px 2px 2px 0px' }} />
            <div>
              이번 주에&nbsp;<span className="bold">{totalTimePerWeek}</span>분 운동했어요
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
  /* position: relative; */
  * {
    font-size: 14px;
    font-weight: 400;
    color: #4a5056;
  }
  .progressInTextBox {
    width: 72px;
    height: 54px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    margin: 42px 28px 32px 28px;
  }
  .countPerWeekText {
    font-size: 24px;
    letter-spacing: -0.96px;
    color: #222529;
    font-weight: bold;
  }
  .weeklyGoalText {
    font-size: 12px;
    letter-spacing: -0.48px;
    color: #aeb5bc;
    font-size: 12px;
  }
  .bold {
    font-weight: bold;
  }
`;

const BottomTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 12px;
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
