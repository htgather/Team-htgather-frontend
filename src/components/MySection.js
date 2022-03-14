import React from "react";
import styled from "styled-components";
import clap from "../Images/MySectionIcon_clap.png";
import Banner from "./Banner";
import Calender from "./Calender";
import jwt_decode from "jwt-decode";
import MyPart from "./MyPart";
import MyRecord from "./MyRecord";
import MostExercised from "./MostExercised";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commonActions } from "../redux/modules/common";
const MySection = () => {
  const nickName = localStorage.getItem("isLogin")
    ? jwt_decode(localStorage.getItem("isLogin")).nickName
    : false;

  const dispatch = useDispatch();
  const myRecords = useSelector((state) => state.common.myRecords);
  React.useEffect(() => {
    if (nickName) {
      dispatch(commonActions.getRecordsDB());
    }
  }, []);
  return (
    <MySectionContainer>
      <MySectionTitle>
        <img src={clap} alt="박수 아이콘" style={{ marginRight: "4px" }} />
        안녕하세요 {nickName && `${nickName}님`} 오늘도 함께 운동해요!
      </MySectionTitle>
      <MySectionContent>
        <MyPart></MyPart>
        <MyPage>
          <MyRecord myRecords={myRecords}></MyRecord>
          <Calender></Calender>
        </MyPage>
        <RightSection>
          <MostExercised myRecords={myRecords} />
          <Banner></Banner>
        </RightSection>
      </MySectionContent>
    </MySectionContainer>
  );
};

const MySectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1320px;
  align-items: center;
  margin: 56px 0 64px 0;
  @media screen and (max-width: 1360px) {
    width: 1000px;
  }
  position: relative;
`;

const MySectionTitle = styled.div`
  color: #222529;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  margin-bottom: 32px;
`;

const MySectionContent = styled.div`
  display: flex;
`;
const MyPage = styled.div`
  width: 985px;
  height: 284px;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 26px 34px;
`;
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  justify-content: space-between;
  @media screen and (max-width: 1360px) {
    display: none;
  }
`;

export default MySection;
