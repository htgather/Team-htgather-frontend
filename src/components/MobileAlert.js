import React from 'react';
import styled from 'styled-components';

const MobileAlert = () => {
  // 모바일

  return (
    <DIV>
      <Contents>
        <div>✋</div>
        <h1>잠깐만요!</h1>
        <div>홈트게더는 태블릿과 PC에 최적화되어있습니다.</div>
        <div>태블릿과 PC로 이용해주세요! </div>
      </Contents>
    </DIV>
  );
};

const DIV = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
`;

export default MobileAlert;
