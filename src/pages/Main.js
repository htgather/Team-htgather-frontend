import React from 'react';
// import { Button, Grid, Input, Text } from "../elements";
import styled from 'styled-components';
import Card from '../components/Card';
import MyPart from '../components/MyPart';
import RoomClickModal from '../components/RoomClickModal';
import KakaoLogin from '../components/KakaoLogin';
import { Buffer } from 'buffer';

// import { FaHeart } from "react-icons/fa";
// import Post from "../components/Post";
// import { useDispatch, useSelector } from "react-redux";
// import { actionCreators as PostActions } from "../redux/modules/post";
// import { actionCreators as CommonActions } from "../redux/modules/common";

const Main = () => {
  const isLocal = localStorage.getItem('isLogin') ? true : false;
  //   const dispatch = useDispatch();
  //   const postList = useSelector((state) => state.post.list);
  //   React.useEffect(() => {
  //     dispatch(PostActions.getPostDB());
  //   }, []);
  if (isLocal) {
    const base64payload = localStorage.getItem('isLogin').split('.')[1];
    const payload = Buffer.from(base64payload, 'base64');
    const result = JSON.parse(payload.toString());
    // console.log('main.js의 token복호화 결과', result);
    const _nickname = result.nickName;
  }

  return (
    <>
      <Container>
        {/* <MoreInfoModal /> */}
        <DIV>
          <RoomClickModal />
          <Card />
        </DIV>
      </Container>
      <MyPart />
    </>
  );
};
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e5e5e5;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DIV = styled.div`
  display: inline-flex;
  justify-content: center;
  margin: auto;
`;

export default Main;
