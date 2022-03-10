import React, { useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import leftBtn from "../Images/CalenderLeftIcon.png";
import rightBtn from "../Images/CalenderRightIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commonActions } from "../redux/modules/common";

const Calender = () => {
  const dispatch = useDispatch();
  // useState를 이용해 오늘 날짜를 관리
  const [getMoment, setMoment] = React.useState(moment());
  const today = getMoment; // 오늘
  // 체크된 날짜 받아오기
  const myRecords = useSelector((state) => state.common.calendarList);
  React.useEffect(() => {
    dispatch(commonActions.getCalendarDB());
  }, []);

  // calendar generate logic
  function generate() {
    // 1년중 그 달의 시작날짜를 구하고 그게 일년중 몇번째 주인지 구함
    // startOf('month') : 이번 달의 첫번 째 날로 설정 set to the first of this month, 12:00 am
    // week() : Week of Year. 이번 년도의 몇번째 주인가? => 3월 8일이면 10
    const startWeek = today.clone().startOf("month").week();
    // clone() 은 기존의 moment가 아닌 새로운 객체를 반환했다는 의미
    // 이번 달의 마지막 날로 설정 한 후 그것이 이번 년도의 몇번째 주인지 체크
    // 1년은 52주(+알파며칠)인데, moment에선 53번째주를 1로 표현하기 때문에 1이면 53으로 바꿔줌
    const endWeek =
      today.clone().endOf("month").week() === 1
        ? 53
        : today.clone().endOf("month").week();

    let calendar = [];

    // 시작 주부터 마지막 주까지 +1 씩 증가시킴
    // 이제 주마다 일을 표기해야 하므로 len이 7인 arr를 생성 후 index를 기반으로 day를 표기하자
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <div className="row" key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              // week(숫자)하면 숫자번째 주를 가리키고, 그 주의 시작일에서 => i일씩 더해서 한 주마다의 일을 나타냄.
              let current = today
                .clone()
                .week(week)
                .startOf("week")
                .add(i, "day");

              // db에서 받아온 날짜 배열 안에 현재 돌고있는 순번의 날짜가 포함돼어있으면서
              // 이전 달의 날짜들은 아닌 경우, selected

              let isSelected =
                myRecords &&
                myRecords.includes(current.format("YYYY-M-D")) &&
                current.format("MM") === today.format("MM")
                  ? "selected"
                  : "";

              // 만약, 이번 달이 아닌 다른 달의 날짜라면 회색으로 표시하자
              let isGrayed =
                current.format("MM") !== today.format("MM") ? "grayed" : "";
              // 돌고있는 달이 오늘이면 isToday는 트루
              let isToday =
                current.format("YYYYMMDD") === today.format("YYYYMMDD")
                  ? "isToday"
                  : "";
              // if (
              //   endWeek + startWeek - 2 * week === -5 &&
              //   isGrayed === "grayed"
              // ) {
              //   return;
              // }
              // 달의 끝주에서 시작주를 뺐을 때 5가나오면 그 달은 6주
              let isSixWeek = endWeek - startWeek === 5 ? "isSixWeek" : "";
              return (
                <div className={`box  ${isGrayed} ${isSixWeek}`} key={i}>
                  <div className={`${isToday}`}></div>
                  <span className={`text ${isSelected}`}>
                    {current.format("D")}
                  </span>
                </div>
              );
            })}
        </div>
      );
    }
    return calendar;
  }

  return (
    <>
      <CalenderBox>
        <CalenderTopBar>
          <img
            src={leftBtn}
            alt="왼쪽버튼"
            onClick={() => {
              setMoment(getMoment.clone().subtract(1, "month"));
            }}
          />
          <span>{today.format("YYYY 년 M 월")}</span>
          <img
            src={rightBtn}
            alt="오른쪽버튼"
            onClick={() => {
              setMoment(getMoment.clone().add(1, "month"));
            }}
          />
        </CalenderTopBar>
        <CalenderBody>
          <div className="row weekday">
            {["일", "월", "화", "수", "목", "금", "토"].map((el) => (
              <div className="box" key={el}>
                <span className="text">{el}</span>
              </div>
            ))}
          </div>
          {generate()}
        </CalenderBody>
      </CalenderBox>
    </>
  );
};
const CalenderBox = styled.div``;
const CalenderTopBar = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const CalenderBody = styled.div`
  font-size: 12px;
  color: #222529;
  .row {
    display: flex;
  }
  .weekday {
    font-size: 13px;
    font-weight: bold;
  }
  .box {
    width: 38px;
    height: 32px;
    display: flex;
    justify-content: center;
    position: relative;
  }
  .calender {
    font-weight: bold;
    width: 24px;
    height: 24px;
    color: black;
  }
  .grayed {
    color: #aeb5bc;
  }
  .selected {
    position: absolute;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: #4a5056;
    border-radius: 50%;
    top: -2.5px;
  }
  .isSixWeek {
    width: 38px;
    height: 26.5px;
  }
  // .isToday {
  //   position: absolute;
  //   right: 8px;
  //   top: -1px;
  //   width: 4px;
  //   height: 4px;
  //   background-color: #4a5056;
  //   border-radius: 50%;
  // }
`;
export default Calender;
