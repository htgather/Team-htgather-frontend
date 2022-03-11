import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import Player from "../components/Player";
import Progress from "../components/Progress";
import { useDispatch, useSelector } from "react-redux";

function Detail(props) {
  const roomId = props.match.params.roomId;
  const roomList = useSelector((state) => state.room.list);
  const roomInfo = roomList.filter((e, i) => e.roomId === roomId)[0];
  const [isStart, setIsStart] = React.useState();

  return (
    <Container>
      <Progress roomInfo={roomInfo} isStart={isStart}></Progress>
      <Player roomInfo={roomInfo} setIsStart={setIsStart}></Player>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  background: #171717;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

// const Count = styled.div`
//   width: 1116px;
//   height: 627px;
//   background-color: rgba(0, 0, 0, 0.8);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 140px;
//   color: white;
//   position: absolute;
// `;
export default Detail;
