import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import KakaoLogin from '../Common/Functions/KakaoLogin';
import jwt_decode from 'jwt-decode';

import lock from './Images/Lock.svg';
import Close from './Images/Close.svg';
import Dropdown from '../Common/Dropdown';

import { logoutWithKakao } from '../Common/Functions/KakaoLogin';
import { actionCreators as userActions } from '../../redux/modules/user';

const MyInfoModal = (props) => {
  const { openMyInfoModal } = props;

  const dispatch = useDispatch();

  // const token = localStorage.getItem('isLogin');
  const is_local = localStorage.getItem('isLogin') ? true : false;
  const myToken = is_local ? jwt_decode(localStorage.getItem('isLogin')) : null;
  const nickName = is_local ? myToken.nickName : '';
  const Goal = is_local ? myToken.weeklyGoal : null;

  //닉네임 변경

  const [nickname, setNickname] = useState(nickName);
  const [selectGoal, setSelectGoal] = useState(Goal);

  const myDropdownList = [1, 2, 3, 4, 5, 6, 7];

  const changeGoal = (weeklyGoal) => {
    setSelectGoal(weeklyGoal);
  };

  const NicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const onClickChange = () => {
    if (nickname === '') {
      alert('닉네임을 입력해주세요');
      return;
    }

    // 닉네임 체크 정규식 (한글/영문/숫자 이용하여 2~9자)
    let _reg = /^[a-zA-Zㄱ-힣0-9]{2,9}$/.test(nickname);

    if (_reg) {
      dispatch(userActions.userInfoChangeFB(nickname, Goal !== selectGoal ? selectGoal + 1 : Goal));
      return;
    } else {
      window.alert('닉네임 형식에 맞지 않습니다');
    }
  };

  const onClickLogOut = () => {
    logoutWithKakao();
    openMyInfoModal(false);
  };

  return (
    <>
      <DIV style={{ height: is_local ? '' : '460px' }}>
        <CloseBtn>
          <img onClick={openMyInfoModal} src={Close} alt="closeBtn" />
        </CloseBtn>
        <Title>마이페이지</Title>
        <Line />
        {!is_local ? (
          <BeforeLogin>
            <Lock />
            <NotiText> 로그인 후에 이용해주세요</NotiText>
            <KakaoLogin />
          </BeforeLogin>
        ) : (
          <>
            <NickName>
              <TextWrap>닉네임</TextWrap>
            </NickName>
            <NickChange>
              <input type="text" maxLength="10" placeholder={'닉네임을 입력해주세요'} onChange={NicknameChange} value={nickname} className="nicknameInput" />
            </NickChange>
            <TextWrap>목표</TextWrap>
            <GoalWrap>
              주&nbsp;&nbsp;
              <CategoryBox>
                <Dropdown changeGoal={changeGoal} myDropdownList={myDropdownList} width="89px" background="#D9DFFE" fontcolor="#878E95">
                  {selectGoal}
                </Dropdown>
              </CategoryBox>
              &nbsp;회 운동
            </GoalWrap>
            <Btns>
              <ChangeBtn onClick={onClickChange}>변경하기</ChangeBtn>
              <LogOutBtn onClick={onClickLogOut}>로그아웃</LogOutBtn>
            </Btns>
          </>
        )}
      </DIV>
    </>
  );
};

const DIV = styled.div`
  background-color: #fff;
  color: rgb(34 37 41);
  z-index: 30;
  width: 400px;
  height: 500px;
  border-radius: 12px;
  top: 2.4rem;
  right: -1.3rem;
  padding: 40px;
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

const Title = styled.div`
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.96px;
  font-weight: bold;
`;

const Line = styled.div`
  background-color: #eaecef;
  width: 320px;
  height: 1px;
  margin-top: 20px;
`;

const BeforeLogin = styled.div`
  width: 315px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 80px;
`;

const Lock = styled.div`
  width: 48px;
  height: 50px;
  background-image: url(${lock});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const NotiText = styled.div`
  color: rgb(34, 37, 41);
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.72pt;
  margin: 14px auto;
`;

const TextWrap = styled.div`
  vertical-align: middle;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  margin: 24px 0 12px;
`;

const NickName = styled.div`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
`;

const NickChange = styled.div`
  display: flex;
  justify-content: space-evenly;
  .nicknameInput {
    width: 320px;
    height: 40px;
    padding: 10px;
    border: 1px solid #f1f3f5;
    background-color: #f1f3f5;
    border-radius: 8px;
    outline: none;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -4%;
  }
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
  letter-spacing: -0.32pt;
`;

const CategoryBox = styled.div`
  width: 89px;
  height: 40px;
  display: flex;
  align-items: center;
`;

const Btns = styled.div`
  height: 108px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 40px;
  /* align-items: center; */
`;

const ChangeBtn = styled.div`
  width: 320px;
  height: 48px;
  border-radius: 12px;
  background-color: #0028fa;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #fff;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.4pt;
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
  font-size: 20px;
  line-height: 34px;
  letter-spacing: -0.8pt;
  /* position: absolute; */
  cursor: pointer;
`;

export default MyInfoModal;
