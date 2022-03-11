import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import KakaoLogin from '../KakaoLogin';
import lock from '../../Images/lock.png';
import Close from '../../Images/Close.png';
import Icon_Menu from '../../Images/Icon_Menu.png';
import Dropdown from '../Dropdown';

import { logoutWithKakao } from '../../components/KakaoLogin';
import { Buffer } from 'buffer';

import { actionCreators as userActions } from '../../redux/modules/user';

const MoreInfoModal = (props) => {
  const { openMyInfoModal, width } = props;

  const dispatch = useDispatch();
  const is_local = localStorage.getItem('isLogin') ? true : false;

  //닉네임 변경
  const myNickname = useSelector((state) => state.User.nickname);

  const [showModal, setShowModal] = useState(false);
  const [nickname, setNickname] = useState('');

  //드롭다운
  const myDropdownList = [1, 2, 3, 4, 5, 6, 7];

  // const [cntAWeek, setCntAWeek] = React.useState();

  // React.useEffect(() => {
  //   // dispatch~
  // }, [cntAWeek]);

  // const getCntAWeek = (cntAWeek) => {
  //   setCntAWeek(cntAWeek);
  // };

  //모달
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
    // window.alert(nickname);
    dispatch(userActions.nickChangeFB(nickname));
  };

  const onClickLogOut = () => {
    logoutWithKakao();
    setShowModal(false);
    // window.alert('로그아웃이 완료되었습니다!');
    // window.location.reload();
  };

  return (
    <React.Fragment>
      <DIV>
        <CloseBtn>
          <img onClick={openMyInfoModal} src={Close} alt="closeBtn" />
        </CloseBtn>
        <TextWrap style={{ fontSize: '25px' }}>마이페이지</TextWrap>
        <Line />
        {is_local ? (
          <>
            <NickName>
              <TextWrap style={{ fontSize: '17px' }}>닉네임</TextWrap>
            </NickName>
            {/* <div>{myNickname}님</div> */}
            <NickChange>
              <NickInput type="text" placeholder="닉네임을 입력해주세요" onChange={NicknameChange} />
            </NickChange>
            <TextWrap style={{ fontSize: '17px', margin: '25px 0px 15px' }}>목표</TextWrap>
            <GoalWrap>
              주
              <CategoryBox>
                <Dropdown dropdownList={myDropdownList} width="89px">
                  {/* getCntAWeek={getCntAWeek} */}3
                </Dropdown>
              </CategoryBox>
              회
            </GoalWrap>
            {/* <NickBtn onClick={onClickNickname}>변경하기</NickBtn> */}
            <div style={{ display: 'inline-block' }}>
              <ChangeBtn>변경하기</ChangeBtn>
              <LogOutBtn onClick={onClickLogOut}>로그아웃</LogOutBtn>
            </div>
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
  width: 140px;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
