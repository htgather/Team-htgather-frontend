import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import KakaoLogin from './KakaoLogin';
import lock from '../Images/lock.png';
import Close from '../Images/Close.png';
import Icon_Menu from '../Images/Icon_Menu.png';

import { actionCreators as userActions } from '../redux/modules/user';

const MoreInfoModal = (props) => {
  const dispatch = useDispatch();
  const is_local = localStorage.getItem('isLogin') ? true : false;

  const [showModal, setShowModal] = useState(false);
  const [nickname, setNickname] = useState('');

  const setModal = () => {
    setShowModal(!showModal);
  };

  const NicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const onClickNickname = () => {
    if (nickname === '') {
      window.alert('수정할 닉네임을 입력해주세요!');
      return;
    }
    window.alert(nickname);
    dispatch(userActions.nickChangeFB(nickname));
  };

  return (
    <React.Fragment>
      <MenuBtn>
        <img style={{ cursor: 'pointer' }} src={Icon_Menu} alt="menu" onClick={setModal} />
      </MenuBtn>
      {showModal ? (
        <>
          <DIV>
            <CloseBtn>
              <img onClick={setModal} src={Close} alt="closeBtn" />
            </CloseBtn>
            <TextWrap style={{ fontSize: '25px' }}>더보기</TextWrap>
            <Line />
            {is_local ? (
              <>
                <TextWrap>닉네임</TextWrap>
                <NickChange>
                  <NickInput type="text" placeholder="닉네임을 입력해주세요" onChange={NicknameChange} />
                  <NickBtn onClick={onClickNickname}>
                    <p>변경하기</p>
                  </NickBtn>
                </NickChange>
                <Line />
                <TextWrap>고객 지원</TextWrap>
                <div style={{ marginTop: '20px' }}>✍️홈트게더 이용 후기 남기기</div>
                <div style={{ marginTop: '10px' }}>😱오류, 버그 신고하기</div>
                <Line />
                <LogOutBtn>로그아웃</LogOutBtn>
              </>
            ) : (
              <Container>
                <div>
                  <img src={lock} width="48px" height="50px" />
                </div>
                <div style={{ marginTop: '20px' }}>로그인 후에 이용해주세요</div>
                <Kakao>
                  <KakaoLogin />
                </Kakao>
              </Container>
            )}
          </DIV>
        </>
      ) : null}
    </React.Fragment>
  );
};

const DIV = styled.div`
  background-color: #fff;
  z-index: 999;
  width: 400px;
  height: 500px;
  border-radius: 12px;
  position: relative;
  top: 300px;
  padding: 50px;
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
  /* :after {
    border-top: 0px solid;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #ddd;
    content: '';
    position: absolute;
    top: -10px;
    right: 100px;
  } */
  box-shadow: rgba(100, 100, 111, 0.2) 0px 5px 15px 0px;
`;

const MenuBtn = styled.div`
  position: absolute;
  right: 30px;
  display: flex;
  align-items: center;
`;

const Line = styled.div`
  background-color: #eaecef;
  width: 320px;
  height: 1px;
  margin: 30px auto 30px;
`;

const TextWrap = styled.div`
  font-weight: bold;
  margin-top: 15px;
`;

const NickChange = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
`;

const NickInput = styled.input`
  width: 232px;
  height: 40px;
  padding: 10px;
  border: 1px solid #f1f3f5;
  background-color: #f1f3f5;
  border-radius: 8px;
  margin-right: 15px;
  outline: none;
`;

const NickBtn = styled.div`
  width: 80px;
  height: 40px;
  font-weight: bold;
  border-radius: 8px;
  background-color: #4a5056;
  color: #fff;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CloseBtn = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 28px;
  top: 25px;
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
