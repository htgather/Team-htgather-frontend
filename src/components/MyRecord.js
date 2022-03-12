import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commonActions } from "../redux/modules/common";
const MyRecord = () => {
  const isLocal = localStorage.getItem("isLogin") ? true : false;
  const dispatch = useDispatch();

  const myRecords = useSelector((state) => state.common.myRecords);
  React.useEffect(() => {
    if (isLocal) {
      dispatch(commonActions.getRecordsDB());
    }
  }, []);
  return (
    <MyRecordBox>
      <Header>이만큼 운동했어요</Header>
      <MyRecordContent></MyRecordContent>
    </MyRecordBox>
  );
};
const MyRecordBox = styled.div`
  height: 100%;
  width: 284px;
  background: red;
  padding: 0px 24px;
`;
const Header = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #222529;
`;

const MyRecordContent = styled.div``;
export default MyRecord;
