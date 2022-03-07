import React, { useState } from 'react';
import styled from 'styled-components';
import lock from '../Images/lock.png';

const MyPart = () => {
  const [isLogin, setIsLogin] = useState(false);

  const login = () => {
    setIsLogin(!isLogin);
  };

  return (
    <React.Fragment>
      <button onClick={login}>로그인 전환 버튼</button>
      <div style={{ display: 'flex' }}>
        <LoginDiv>
          <Calendar>달력</Calendar>
          <Contents>뭐들어가지</Contents>
          <Unknown2>뭐들어가지22</Unknown2>
        </LoginDiv>
        {isLogin ? (
          ''
        ) : (
          <DIV>
            <Container>
              <div>
                <img src={lock} width="48px" height="50px" />
              </div>
              <div style={{ marginTop: '20px', color: '#fff' }}>로그인 후에 이용해주세요</div>
              <LoginBtn>카카오 계정으로 시작하기</LoginBtn>
            </Container>
          </DIV>
        )}
      </div>
    </React.Fragment>
  );
};

const DIV = styled.div`
  width: 984px;
  height: 284px;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  position: absolute;
`;

const LoginDiv = styled.div`
  width: 984px;
  height: 284px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  background-color: #fff;
  border-radius: 12px;
`;

const Contents = styled.div`
  width: 328px;
  height: 284px;
`;
const Calendar = styled.div`
  width: 328px;
  height: 284px;
  /* background-color: #f2d2de; */
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;

const Unknown2 = styled.div`
  width: 328px;
  height: 284px;
  /* background-color: blue; */
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const Container = styled.div`
  margin: auto;
  text-align: center;
`;

const LoginBtn = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
  border-radius: 20px;
  width: 316px;
  height: 56px;
  margin-top: 30px;
`;

export default MyPart;
