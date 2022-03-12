import React, { useState } from 'react';
import styled from 'styled-components';
import Close from '../../Images/Close.png';
import KakaoLogin from '../../components/KakaoLogin';

const MyInfoModal = (props) => {
  const { openMyInfoModal } = props;

  const is_local = localStorage.getItem('isLogin') ? true : false;
  const [MyModal, setMyModal] = useState(false);

  return (
    <React.Fragment>
      {is_local ? (
        <DIV onClick={openMyInfoModal}>
          <CloseBtn>
            <img src={Close} alt="closeBtn" />
          </CloseBtn>
          <TextWrap style={{ fontSize: '24px' }}>더보기</TextWrap>
          <Line />
          <TextWrap style={{ fontSize: '17px' }}>고객 지원</TextWrap>
          <div style={{ marginTop: '15px' }}>✍️홈트게더 이용 후기 남기기</div>
          <div style={{ marginTop: '10px' }}>😱오류, 버그 신고하기</div>
        </DIV>
      ) : (
        <DIV height="350px">
          <CloseBtn>
            <img src={Close} alt="closeBtn" />
          </CloseBtn>
          <TextWrap style={{ fontSize: '24px' }}>더보기</TextWrap>
          <Line />
          <TextWrap style={{ fontSize: '17px' }}>고객 지원</TextWrap>
          <div style={{ marginTop: '15px' }}>✍️홈트게더 이용 후기 남기기</div>
          <div style={{ marginTop: '10px' }}>😱오류, 버그 신고하기</div>
          <Login>
            <KakaoLogin />
          </Login>
        </DIV>
      )}
    </React.Fragment>
  );
};

const DIV = styled.div`
  background-color: #fff;
  z-index: 999;
  width: 400px;
  ${(props) => (props.height ? `height: ${props.height};` : 300)};
  /* height: 350px; */
  border-radius: 12px;
  top: 45px;
  right: -20px;
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

const Login = styled.div`
  position: absolute;
  bottom: 40px;
  display: flex;
  left: 75px;
`;

const CloseBtn = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 28px;
  top: 25px;
  cursor: pointer;
`;

export default MyInfoModal;
