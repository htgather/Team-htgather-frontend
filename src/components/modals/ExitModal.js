import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

import { history } from '../../redux/configureStore';
import Close from '../../Images/Close.png';

import { HiVolumeUp } from 'react-icons/hi';
import { FaVolumeMute } from 'react-icons/fa';

const CompleteModal = (props) => {
  const { exitRoom } = props;

  const [isDone, setIsDone] = React.useState(false);
  const [closeModal, setCloseModal] = React.useState(false);

  // onClick={exitModal}
  // onClick={(e) => e.stopPropagation()}
  return (
    <>
      <BackGround>
        <ModalWrap>
          <CloseBtn onClick={exitRoom}>
            <img src={Close} alt="취소" />
          </CloseBtn>
          <div onClick={(e) => e.stopPropagation()}>
            <ModalContents>
              <div style={{ fontSize: '33px', fontWeight: 'bold', marginBottom: '20px' }}>{isDone ? '운동끝! 오늘도 해냈어요!' : '정말 나가시겠어요?'}</div>
              <div style={{ fontSize: '16px', color: '#878E95' }}>{isDone ? '운동시간을 저장하고 지금까지 함께 운동한 시간을 볼 수 있어요!' : '지금 운동을 종료하면 운동시간이 기록되지 않아요.'} </div>
              <BtnWrap
                onClick={() => {
                  history.replace('/');
                }}
              >
                {isDone ? '운동시간 저장하기' : '운동 그만하기'}
              </BtnWrap>
            </ModalContents>
          </div>
        </ModalWrap>
      </BackGround>
    </>
  );
};

const BackGround = styled.div`
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 100;
`;

const ModalWrap = styled.div`
  background-color: #fff;
  width: 661px;
  height: 358px;
  border-radius: 12px;
  position: fixed;
  text-align: center;
  left: 50%;
  right: 50%;
  top: 50%;
  bottom: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const CloseBtn = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 15;
  cursor: pointer;
`;

const ModalContents = styled.div`
  width: 661px;
  height: 358px;
  position: absolute;
  padding: 90px;
`;

const BtnWrap = styled.div`
  width: 381px;
  height: 60px;
  border-radius: 8px;
  background-color: #0028fa;
  color: #f1f3f5;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  right: 50%;
  top: 55%;
  bottom: 50%;
  transform: translate(-50%, -50%);
  /* max-height: 80%; */
  width: 960px;
  height: 480px;
  text-align: center;
  z-index: 999;

  /* @media ${(props) => props.theme.device.MobileLandscape} {
    width: 90%; */
  /* } */
`;

export default CompleteModal;
