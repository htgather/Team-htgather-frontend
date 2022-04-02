import React from 'react';
import styled from 'styled-components';

import fighting from './Images/MostExercised_Fighting.svg';

const MostExercised = (props) => {
  const { myRecords } = props;
  const isRecords = myRecords.mostExercised ? true : false;

  const records = myRecords.mostExercised;
  // const recordsLength = records.length;

  return (
    <>
      <MostExercisedContainer>
        <MostExercisedHeader>
          이런 운동을 많이 했어요
          <img src={fighting} alt="팔 아이콘" style={{ marginLeft: '2px' }} width="16" />
        </MostExercisedHeader>
        <MostExercisedContentBox>
          {isRecords ? (
            <>
              {/* 많이 한 운동에 데이터가 없을 때 */}
              {records.length === 0 ? (
                <>
                  <Noti>
                    <div>
                      아직 운동 기록이 없어요. <br />
                      홈트게더와 함께 즐거운 운동을 경험해보세요!
                    </div>
                  </Noti>
                </>
              ) : (
                <>
                  {records[0] && (
                    <MostExercisedContent>
                      <img src={records[0][2]} alt="" className="MostExercisedImg" />
                      <div className="MostExercisedContentTextBox">
                        <div className="MostExercisedTitle">{records[0][0]}</div>
                        <div className="MostExercisedTimes" style={{ marginTop: '-2px' }}>
                          {records[0][1]}회
                        </div>
                      </div>
                    </MostExercisedContent>
                  )}
                  {records[1] && (
                    <MostExercisedContent>
                      <img src={records[1][2]} alt="" className="MostExercisedImg" />
                      <div className="MostExercisedContentTextBox">
                        <div className="MostExercisedTitle">{records[1][0]}</div>
                        <div className="MostExercisedTimes" style={{ marginTop: '-2px' }}>
                          {records[1][1]}회
                        </div>
                      </div>
                    </MostExercisedContent>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <Noti>
                <div>
                  아직 운동 기록이 없어요. <br />
                  홈트게더와 함께 즐거운 운동을 경험해보세요!
                </div>
              </Noti>
            </>
          )}
        </MostExercisedContentBox>
      </MostExercisedContainer>
    </>
  );
};
const MostExercisedContainer = styled.div`
  width: 316px;
  height: 132px;
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  letter-spacing: -0.48px;
`;
const MostExercisedHeader = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin: 24px 0px 12px 24px;
  line-height: 24px;
  letter-spacing: -0.64pt;
`;

const MostExercisedContentBox = styled.div`
  width: 268px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  margin: 0px 24px 20px 24px;
`;

const MostExercisedContent = styled.div`
  width: 132px;
  height: 56px;
  border-radius: 6px;
  background-color: #f1f3f5;
  display: flex;
  line-height: 20px;

  .MostExercisedContentTextBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 1px;
    line-height: 20px;
  }
  .MostExercisedTitle {
    font-size: 13px;
    letter-spacing: -0.26pt;
  }
  .MostExercisedTimes {
    font-size: 12px;
    color: #878e95;
    letter-spacing: -0.48pt;
  }
  .MostExercisedImg {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin: 8px 6px 8px 8px;
  }
`;

const Noti = styled.div`
  font-size: 14px;
  letter-spacing: -0.56pt;
  line-height: 20px;
  color: #aeb5bc;
`;

export default MostExercised;
