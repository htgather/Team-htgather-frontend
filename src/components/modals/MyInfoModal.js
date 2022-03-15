import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import KakaoLogin from '../KakaoLogin';
import jwt_decode from 'jwt-decode';

import lock from '../../Images/lock.png';
import Close from '../../Images/Close.png';
import Dropdown from '../Dropdown';

import { logoutWithKakao } from '../KakaoLogin';
import { actionCreators as userActions } from '../../redux/modules/user';

const MoreInfoModal = (props) => {
  const { openMyInfoModal, width } = props;

  const dispatch = useDispatch();

  const is_local = localStorage.getItem('isLogin');
  const myToken = jwt_decode(localStorage.getItem('isLogin'));
  const nickName = is_local ? myToken.nickName : '';
  const Goal = is_local ? myToken.weeklyGoal : null;

  console.log('토큰', Goal);

  //닉네임 변경
  const [showModal, setShowModal] = useState(false);
  const [nickname, setNickname] = useState(nickName);
  const [selectGoal, setSelectGoal] = useState(Goal);

  const myDropdownList = [1, 2, 3, 4, 5, 6, 7];

  const changeGoal = (weeklyGoal) => {
    setSelectGoal(weeklyGoal);
  };

  //모달
  const setModal = () => {
    setShowModal(!showModal);
  };

  const NicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const onClickChange = () => {
    if (nickname === '') {
      alert('닉네임을 입력해주세요');
      return;
    }
    dispatch(userActions.userInfoChangeFB(nickname, Goal !== selectGoal ? selectGoal + 1 : Goal));
  };

  const onClickLogOut = () => {
    logoutWithKakao();
    openMyInfoModal(false);
    // window.alert("다음에 또 만나요!");
  };

  return (
    <React.Fragment>
      <DIV>
        <CloseBtn>
          <img onClick={openMyInfoModal} src={Close} alt="closeBtn" />
        </CloseBtn>
        <TextWrap style={{ fontSize: '25px' }}>마이페이지</TextWrap>
        <Line />
        <NickName>
          <TextWrap style={{ fontSize: '17px' }}>닉네임</TextWrap>
        </NickName>
        <NickChange>
          <NickInput type="text" placeholder={'닉네임을 입력해주세요'} onChange={NicknameChange} value={nickname} />
        </NickChange>
        <TextWrap style={{ fontSize: '17px', margin: '25px 0px 15px' }}>목표</TextWrap>
        <GoalWrap>
          주&nbsp;&nbsp;
          <CategoryBox>
            <Dropdown changeGoal={changeGoal} myDropdownList={myDropdownList} width="89px">
              {selectGoal}
              {/* {selectGoal ? selectGoal : Goal} */}
            </Dropdown>
          </CategoryBox>
          &nbsp;회 운동
        </GoalWrap>
        <div style={{ display: 'inline-block' }}>
          <ChangeBtn onClick={onClickChange}>변경하기</ChangeBtn>
          <LogOutBtn onClick={onClickLogOut}>로그아웃</LogOutBtn>
        </div>
      </DIV>
    </React.Fragment>
  );
};

const DIV = styled.div`
  background-color: #fff;
  z-index: 999;
  width: 400px;
  height: 500px;
  border-radius: 12px;
  top: 45px;
  right: 33px;
  padding: 50px;
  position: absolute;
  :before {
    border-top: 0px solid;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
    content: '';
    position: absolute;
    top: -10px;
    right: 24px;
  }
  box-shadow: rgba(100, 100, 111, 0.2) 0px 5px 15px 0px;
`;

const Line = styled.div`
  background-color: #eaecef;
  width: 320px;
  height: 1px;
  margin: 20px auto 30px;
`;

const TextWrap = styled.div`
  vertical-align: middle;
  font-weight: bold;
`;

const NickName = styled.div`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
`;

const NickChange = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
`;

const NickInput = styled.input`
  width: 320px;
  height: 40px;
  padding: 10px;
  border: 1px solid #f1f3f5;
  background-color: #f1f3f5;
  border-radius: 8px;
  outline: none;
`;

const CloseBtn = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 28px;
  top: 25px;
  cursor: pointer;
`;

const GoalWrap = styled.div`
  width: 250px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 16px;
`;

// const Dropdown = styled.div`
//   width: 89px;
//   height: 40px;
//   background-color: pink;
// `;

const CategoryBox = styled.div`
  width: 89px;
  height: 40px;
  display: flex;
  align-items: center;
  /* & > p {
    margin: 0 16px 0 38px;
    @media screen and (max-width: 1360px) {
      margin: 0 16px 0 10px;
    }
  } */
`;

const ChangeBtn = styled.div`
  width: 320px;
  height: 48px;
  font-weight: bold;
  border-radius: 12px;
  border: 1px none;
  color: #fff;
  background-color: #0028fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  position: absolute;
  bottom: 100px;
  cursor: pointer;
`;

const LogOutBtn = styled.div`
  width: 320px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid #aeb5bc;
  color: #aeb5bc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  position: absolute;
  bottom: 40px;
  cursor: pointer;
`;

// 비로그인
const Container = styled.div`
  margin: 70px auto;
  text-align: center;
`;

const LoginBtn = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: dimgray;
  border-radius: 20px;
  width: 316px;
  height: 56px;
  margin-top: 30px;
  cursor: pointer;
`;

const Kakao = styled.div`
  margin-top: 30px;
`;
export default MoreInfoModal;
