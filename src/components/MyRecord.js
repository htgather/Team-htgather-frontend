import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commonActions } from '../redux/modules/common';
import Progress from '@delowar/react-circle-progressbar';
import fireIcon from '../Images/MyRecordIcon_Fire.png';
import clockIcon from '../Images/MyRecordIcon_Clock.png';
const MyRecord = (props) => {
  const {
    myRecords: {
      // 각 값의 디폴트값_ 구조분해할당
      countPerWeek = 1,
      weeklyGoal = 3,
      daysInARow = 38,
      totalTimePerMonth = 40,
    } = {},
  } = props;
  const [percent, SetPercent] = React.useState((countPerWeek / weeklyGoal) * 100 >= 100 ? 100 : (countPerWeek / weeklyGoal) * 100);
  // countPerWeek, weeklyGoal, daysInARow, totalTimePerMonth
  return (
    <MyRecordBox>
      <Header>이만큼 운동했어요</Header>
      <MyRecordContent>
        <Progress percent={percent} fillColor="#0028FA" emptyColor="#EAECEF" size={144} borderWidth={9} borderBgWidth={9}>
          <div className="progressInTextBox">
            <div className="countPerWeekText">{countPerWeek}일</div>
            <div className="weeklyGoalText">이번주 목표 {weeklyGoal}일</div>
          </div>
        </Progress>
        <BottomTextContainer>
          <div className="bottomTextBox">
            <img src={fireIcon} alt="불꽃 아이콘" style={{ marginRight: '2px' }} />
            연속 <span className="bold">{daysInARow}</span>일째 운동중이에요
          </div>
          <div className="bottomTextBox">
            <img src={clockIcon} alt="시계 아이콘" style={{ marginRight: '2px' }} />
            이번 주에 <span className="bold">{totalTimePerMonth}</span>분 운동했어요
          </div>
        </BottomTextContainer>
      </MyRecordContent>
    </MyRecordBox>
  );
};

// MyRecord.defaultProps = {
//   countPerWeek: 1,
//   weeklyGoal: 3,
//   dayInARow: 38,
//   totalTimePerMonth: 40,
// };
const MyRecordBox = styled.div`
  height: 100%;
  width: 315px;
  padding: 0px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #222529;
  line-height: 1.5;
  letter-spacing: -0.64px;
  margin-bottom: 16px;
  position: relative;
  right: 84px;
`;

const MyRecordContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  * {
    font-size: 14px;
    font-weight: 400;
    color: #4a5056;
  }
  .progressInTextBox {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .countPerWeekText {
    font-size: 24px;
    letter-spacing: -0.96px;
    color: #222529;
    font-weight: bold;
    margin-bottom: 4px;
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
  margin-top: 12px;
  .bottomTextBox {
    margin-bottom: 4px;
  }
`;
export default MyRecord;
