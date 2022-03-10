import React from "react";
// import { Button, Grid, Input, Text } from "../elements";
import styled from "styled-components";
import RoomCard from "../components/Card";
import RoomSectionTab from "../components/RoomSectionTab";
import MySection from "../components/MySection";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as roomActions } from "../redux/modules/room";

const Main = () => {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.room.list);

  React.useEffect(() => {
    // 방정보 리스트 불러오기
    dispatch(roomActions.getRoomDB());
  }, []);

  return (
    <>
      <Container>
        <MySection></MySection>
        <RoomSection>
          <RoomSectionTab></RoomSectionTab>
          <RoomCardList>
            {roomList.map((e, i) => (
              <RoomCard key={i} roomInfo={e}></RoomCard>
            ))}
            <RoomCard last="last"></RoomCard>
          </RoomCardList>
        </RoomSection>
      </Container>
    </>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;
`;

const RoomSection = styled.div``;

const RoomCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 315px);
  grid-gap: 20px;
  @media screen and (max-width: 1360px) {
    grid-template-columns: repeat(3, 315px);
  }
`;

export default Main;
