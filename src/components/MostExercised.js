import React from 'react';
import styled from 'styled-components';

import MyCategoryRecordIcon from '../Images/MyCategoryRecordIcon.png';
import Category1 from '../Images/Category1.png';
import Category2 from '../Images/Category2.png';

const MostExercised = (props) => {
  const { myRecords } = props;

  const records = props.myRecords.mostExercised;

  React.useEffect(() => {}, []);

  return (
    <>
      <MostExercisedContainer>
        <MostExercisedHeader>
          이런 운동을 많이 했어요
          <img src={MyCategoryRecordIcon} alt="팔 아이콘" style={{ marginLeft: '2px' }} />
        </MostExercisedHeader>
        <MostExercisedContentBox>
          {records && (
            <>
              <MostExercisedContent>
                <img src={Category1} alt="" className="MostExercisedImg" />
                <div className="MostExercisedContentTextBox">
                  <div className="MostExercisedTitle">{records[0][0]}</div>
                  <div className="MostExercisedTimes">{records[0][1]}회</div>
                </div>
              </MostExercisedContent>
              <MostExercisedContent>
                <img src={Category2} alt="" className="MostExercisedImg" />
                <div className="MostExercisedContentTextBox">
                  <div className="MostExercisedTitle">{records[1][0]}</div>
                  <div className="MostExercisedTimes">{records[1][1]}회</div>
                </div>
              </MostExercisedContent>
            </>
          )}
        </MostExercisedContentBox>
      </MostExercisedContainer>
    </>
  );
};
const MostExercisedContainer = styled.div`
  width: 315px;
  height: 136px;
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  padding: 24px 24px 20px 24px;
`;
const MostExercisedHeader = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const MostExercisedContentBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MostExercisedContent = styled.div`
  width: 124px;
  height: 56px;
  border-radius: 6px;
  background-color: #f1f3f5;
  display: flex;
  align-items: center;
  padding: 8px 10px;

  .MostExercisedContentTextBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 12px;
  }
  .MostExercisedTitle {
    font-size: 14px;
  }
  .MostExercisedTimes {
    font-size: 12px;
    color: #878e95;
  }
  .MostExercisedImg {
    width: 40px;
    height: 40px;
  }
`;
export default MostExercised;
