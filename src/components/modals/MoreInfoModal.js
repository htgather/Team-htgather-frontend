import React, { useState } from 'react';
import styled from 'styled-components';
import Close from '../../Images/Close.png';
import KakaoLogin from '../../components/KakaoLogin';

const MyInfoModal = (props) => {
  const { openMyInfoModal } = props;

  const is_local = localStorage.getItem('isLogin') ? true : false;
  const [MyModal, setMyModal] = useState(false);

  const onClickClose = () => {
    setMyModal(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <DIV style={{ height: is_local ? '290px' : '350px' }}>
        <CloseBtn>
          <img src={Close} alt="closeBtn" onClick={onClickClose} />
        </CloseBtn>
        <div onClick={(e) => e.stopPropagation()}>
          <TextWrap style={{ fontSize: '24px' }}>더보기</TextWrap>
          <Line />
          <TextWrap>고객 지원</TextWrap>
          <DESC>
            ✍️&nbsp;홈트게더 이용 후기 남기기
            <br />
            😱&nbsp;오류, 버그 신고하기
          </DESC>
          {is_local ? null : (
            <Login>
              <KakaoLogin />
            </Login>
          )}
        </div>
      </DIV>
    </div>
  );
};

const DIV = styled.div`
  background-color: #fff;
  z-index: 30;
  width: 400px;
  border-radius: 12px;
  top: 20px;
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
  font-size: large;
`;

const DESC = styled.div`
  font-size: 16px;
  margin-top: 8px;
  height: 30px;
  line-height: 30px;
`;

const Login = styled.div`
  position: absolute;
  bottom: 33px;
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
