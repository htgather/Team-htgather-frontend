import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commonActions } from '../redux/modules/common';

import { Progress } from 'antd';
import 'antd/dist/antd.css';

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

  const per = Math.floor((countPerWeek / weeklyGoal) * 100);
  // console.log(percent);

  // const [percent, SetPercent] = React.useState((countPerWeek / weeklyGoal) * 100 >= 100 ? 100 : (countPerWeek / weeklyGoal) * 100);

  // const myRecords = useSelector((state) => state.common.myRecords);
  // React.useEffect(() => {
  //   if (nickName) {
  //     dispatch(commonActions.getRecordsDB());
  //   }
  // }, []);
  // const [percent, SetPercent] = React.useState(
  //   (countPerWeek / weeklyGoal) * 100 >= 100
  //     ? 100
  //     : (countPerWeek / weeklyGoal) * 100
  // );
  // const { myRecords } = props;
  // const [countPerWeek, setCountPerWeek] = React.useState(1);
  // const [weeklyGoal, setWeeklyGoal] = React.useState(3);
  // const [daysInARow, setDaysInARow] = React.useState(38);
  // const [totalTimePerMonth, setTotalTimePerMonth] = React.useState(40);
  // const [percent, setPercent] = React.useState();
  // React.useEffect(() => {
  //   if (myRecords) {
  //     setCountPerWeek(myRecords.countPerWeek);
  //     setWeeklyGoal(myRecords.weeklyGoal);
  //     setDaysInARow(myRecords.daysInARow);
  //     setTotalTimePerMonth(myRecords.totalTimePerMonth);
  //     setPercent(100);
  //   }
  // }, [myRecords]);

  // countPerWeek, weeklyGoal, daysInARow, totalTimePerMonth

  return (
    <MyRecordBox>
      <Header>이만큼 운동했어요</Header>
      <MyRecordContent>
        <Progress type="circle" percent={per} showInfo={false} width={142} trailColor="#EAECEF" strokeColor="#0028FA" />
        <div className="progressInTextBox">
          <div className="countPerWeekText">{countPerWeek}일</div>
          <div className="weeklyGoalText">이번주 목표 {weeklyGoal}일</div>
        </div>
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
  height: 284px;
  padding: 19px 24px;
  width: 315px;
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
  margin-bottom: 19px;
  position: relative;
  right: 84px;
`;

const MyRecordContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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
    margin-top: 40px;
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
  margin-top: 10px;
  .bottomTextBox {
    letter-spacing: -0.48px;
  }
`;
export default MyRecord;
