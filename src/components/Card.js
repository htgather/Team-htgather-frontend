import React, { useState } from 'react';
import styled from 'styled-components';

import User from '../Images/User.png';
import lock from '../Images/CardIcon_lock.png';
import emoji from '../Images/RoomCardIcon_emoji.png';

import MakeRoomModal from './modals/MakeRoomModal';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as roomActions } from '../redux/modules/room';
import { history } from '../redux/configureStore';

const Card = (props) => {
  const { roomInfo } = props;
  const dispatch = useDispatch();
  const [isMakeModal, setIsMakeModal] = React.useState();
  const is_local = localStorage.getItem('isLogin') ? true : false;
  // const [showModal, setShowModal] = useState(false);

  // 카드 클릭시 방입장 함수
  function joinRoom() {
    if (!is_local) {
      props.setIsLoginModal(true);
      return;
    }
    if (roomInfo.isStart) {
      return;
    }
    // let result = window.confirm("들어갈래 나갈래");
    // if (result) {
    // history.push(`/room/${roomInfo.roomId}`);
    dispatch(roomActions.joinRoomDB(roomInfo.roomId));
  }
  // 마지막 카드
  if (props.last) {
    return (
      <>
        {isMakeModal && <MakeRoomModal setIsMakeModal={setIsMakeModal} isMakeModal={isMakeModal}></MakeRoomModal>}
        <CardContainer last="last" style={{ fontWeight: 'bold', fontSize: '18px', lineHeight: '26px' }}>
          <img src={emoji} alt="이모지 아이콘" style={{ marginBottom: '8px' }} />
          <p>찾으시는 운동방이 없나요?</p>
          <p>직접 만들고 사람들을 모집해보세요!</p>
          <LastCardBtn
            onClick={() => {
              if (!is_local) {
                props.setIsLoginModal(true);
                return;
              }
              setIsMakeModal(true);
            }}
            style={{ cursor: 'pointer' }}
          >
            방만들기
          </LastCardBtn>
        </CardContainer>
      </>
    );
  }

  console.log(roomInfo);
  // 방 카드
  return (
    <>
      <CardContainer onClick={joinRoom} isStart={roomInfo.isStart}>
        {roomInfo.isStart && (
          <CardLock>
            <img src={lock} alt="자물쇠 아이콘" />
            <p
              style={{
                margin: '14px 0px 8px 0px',
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              이미 시작된 방이에요
            </p>
            <p style={{ letterSpacing: '-0.28px', fontSize: '14px' }}>다음에 참여해보세요!</p>
          </CardLock>
        )}
        <CardImgBox>
          <CardImg thumbnail={roomInfo.videoThumbnail}></CardImg>
          <CardHoverBox>
            <p>{roomInfo.videoTitle}</p>
            <p style={{ textAlign: 'end' }}>{roomInfo.videoLength}</p>
          </CardHoverBox>
        </CardImgBox>
        <CardContent>
          <div>
            <CardTag style={{ backgroundColor: roomInfo.difficulty === '고급' ? '#2E4EF6' : roomInfo.difficulty === '중급' ? '#5C74F2' : roomInfo.difficulty === '초급' ? '#8999ed' : '' }}>
              {roomInfo.difficulty}
            </CardTag>
            <CardTag style={{ background: '#FA9219' }}>{roomInfo.category}</CardTag>
          </div>
          <CardTitle>{roomInfo.roomTitle}</CardTitle>
          <CardInfo>
            <p>{roomInfo.videoStartAt} 시작</p>
            <div className="cardInfo_personBox">
              <img src={User} alt="사람 아이콘" style={{ marginRight: '6px' }} />
              <p>{roomInfo.numberOfPeopleInRoom > 5 ? 5 : roomInfo.numberOfPeopleInRoom}/ 5</p>
            </div>
          </CardInfo>
        </CardContent>
      </CardContainer>
    </>
  );
};
const CardImgBox = styled.div``;
const CardHoverBox = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  width: 315px;
  height: 172px;
  border-radius: 16px 16px 0px 0px;
  top: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  line-height: 20px;
  font-size: 14px;
  letter-spacing: -0.28px;
  display: none;
`;

const CardContainer = styled.div`
  width: 315px;
  height: 336px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(34, 37, 41, 0.12);
  letter-spacing: -0.04em;
  position: relative;
  ${(props) => (props.isStart || props.last ? `` : `cursor:pointer;`)}
  ${(props) =>
    props.isStart
      ? ``
      : `&:hover > ${CardImgBox}> ${CardHoverBox} {
        display: flex;
      }
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 0px 24px 0 rgba(34, 37, 41, 0.24);
        transition: transform 0.4s, translateY ease-out;
      }`}
  ${(props) => (props.last ? `display: flex; justify-content: center; align-items:center; flex-direction:column` : '')}
`;
const LastCardBtn = styled.div`
  font-weight: bold;
  font-size: 24px;
  color: white;
  padding: 11px 84px;
  background: #667efc;
  border-radius: 20px;
  position: relative;
  top: 54px;
`;

const CardImg = styled.div`
  background-image: ${(props) =>
    props.thumbnail
      ? `url(${props.thumbnail})`
      : `url(
        "https://media.vlpt.us/images/ohzzi/post/5623ffdb-7aac-4920-b1f5-b6d4fdf044cd/image.png?w=640"
      )`};
  padding-top: 54%;
  background-size: cover;
  background-position: center;
  border-radius: 16px 16px 0px 0px;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CardTag = styled.div`
  display: inline-block;
  padding: 4px 8px;
  background: #8999ed;
  color: #f8f9fa;
  border-radius: 4px;
  margin-right: 12px;
  font-size: 12px;
`;
const CardTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin: 12px 0px;
  height: 48px;
  line-height: 24px;
  color: rgb(34, 37, 41);
`;
const CardInfo = styled.div`
  font-size: 14px;
  margin-top: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #aeb5bc;
  font-weight: 400;
  .cardInfo_personBox {
    height: 16px;
    display: flex;
    align-items: center;
    color: #aeb5bc;
  }
`;

const CardLock = styled.div`
  position: absolute;
  background-color: rgba(34, 37, 41, 0.8);
  width: 100%;
  height: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;
export default Card;
