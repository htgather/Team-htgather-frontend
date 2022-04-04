import React from 'react';
import styled from 'styled-components';

import Close from './Images/Close.svg';
import guide1 from './Images/ManualModal_Guide1.png';
import guide2 from './Images/Guide_Guide2.png';
import guide2_2 from './Images/Guide_Guide2_2.png';
import guide3 from './Images/ManualModal_Guide3.png';
import guide4 from './Images/ManualModal_Guide4.png';
import guide5 from './Images/ManualModal_Guide5.png';

const ManualModal = (props) => {
  const { openManual } = props;

  const circleArray = [0, 0, 0, 0, 0];

  const [page, setPage] = React.useState(0);

  // 아래 원형 클릭시에도 인덱스를 바꿔줌
  const clickCircle = (i) => {
    setPage(i);
  };

  const clickPrev = () => {
    if (page === 0) {
      return;
    }
    setPage(page - 1);
  };

  const ClickNext = () => {
    if (page >= circleArray.length - 1) {
      return;
    }
    setPage(page + 1);
  };

  return (
    <BackGround>
      <ModalWrap>
        <CloseBtn onClick={openManual}>
          <img src={Close} alt="취소" />
        </CloseBtn>
        <Container>
          <ModalContents onClick={(e) => e.stopPropagation()}>
            {page === 1 ? (
              <>
                <TextWrap>찾는 운동방이 없다면 직접 만들어보세요</TextWrap>
                <Img />
                <SmallImg />
                <GreyText>함께하고 싶은 운동 영상의 링크를 유튜브에서 복사하고 붙여 넣어 주세요</GreyText>
              </>
            ) : (
              <>
                <TextWrap>
                  {page === 0
                    ? '운동방에 참여해 사람들과 함께 운동해 보세요'
                    : page === 2
                    ? '운동 시작 전에 사람들과 함께 운동할 준비를 해주세요'
                    : page === 3
                    ? '사람들과 함께 같은 영상을 보며 홈트를 즐겨보세요'
                    : '꾸준히 운동하는 재미를 느껴보세요'}
                </TextWrap>
                <ImageWrap
                  src={page === 0 ? guide1 : page === 1 ? '' : page === 2 ? guide3 : page === 3 ? guide4 : guide5}
                  style={{
                    margin: page === 2 || page === 3 ? '32px auto 28px' : '',
                  }}
                />
                <GreyText>
                  {page === 0 ? (
                    '함께 운동할 영상의 난이도, 카테고리를 보고 나에게 맞는 방에 참가해보세요'
                  ) : page === 1 ? (
                    '함께하고 싶은 운동 영상의 링크를 유튜브에서 복사하고 붙여 넣어 주세요'
                  ) : page === 2 ? (
                    <div>
                      운동 시작 전 마이크와 카메라 상태를 체크하고
                      <br /> 운동 영상 아래에 있는 음소거 해제 버튼을 눌러주세요
                    </div>
                  ) : page === 3 ? (
                    <div>
                      방의 링크를 복사해 다른 사람을 초대하고 함께 운동해 보세요 <br />
                      격려하기 버튼을 통해 서로 응원하며 즐겁게 운동할 수 있어요
                    </div>
                  ) : (
                    '운동이 끝나면 운동 기록이 저장되어 나만의 운동 기록을 쌓을 수 있어요'
                  )}
                </GreyText>
              </>
            )}
          </ModalContents>
          <Buttons style={{ marginTop: page === 2 || page === 3 ? '8px' : '' }}>
            <Btn
              style={{
                color: '#AEB5BC',
                cursor: page === 0 ? 'default' : null,
              }}
              onClick={clickPrev}
            >
              {page === 0 ? null : '이전'}
            </Btn>
            <CircleBox>
              {circleArray.map((e, i) => (
                <Circle
                  key={i}
                  onClick={() => {
                    clickCircle(i);
                  }}
                  style={{
                    width: i === page ? '24px' : null,
                    borderRadius: i === page ? '8px' : null,
                    background: i === page ? '#0028FA' : null,
                    transition: 'width 0.3s',
                  }}
                ></Circle>
              ))}
            </CircleBox>
            <Btn onClick={page === circleArray.length - 1 ? openManual : ClickNext}>{page === circleArray.length - 1 ? '확인' : '다음'}</Btn>
          </Buttons>
        </Container>
      </ModalWrap>
    </BackGround>
  );
};

const DIV = styled.div``;

const BackGround = styled.div`
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  z-index: 100;
`;

const ModalWrap = styled.div`
  background-color: #fff;
  width: 820px;
  height: 570px;
  box-sizing: border-box;
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
  right: 32px;
  top: 32px;
  z-index: 15;
  cursor: pointer;
`;

const Container = styled.div`
  height: 570px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
`;

const ModalContents = styled.div`
  height: 100%;
  margin: 64px auto 0px; //20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
`;

const TextWrap = styled.div`
  color: rgb(34, 37, 41);
  font-size: 24px;
  line-height: 34px;
  font-weight: bold;
  letter-spacing: -0.96pt;
`;

const ImageWrap = styled.img`
  margin: 32px auto 40px;
  width: 518px;
  height: 280px;
  background: #eaecef;
  background-size: cover;
  background-position: center;
  box-shadow: 0 10px 10px 10px rgba(0, 0, 0, 0.045);
`;

// 2페이지일 때
const Img = styled.div`
  width: 260px;
  height: 296px;
  margin: 28px auto;
  background-image: url(${guide2});
  background-size: cover;
  background-position: center;
  box-shadow: 0 10px 10px 10px rgba(0, 0, 0, 0.045);
  position: relative;
`;
const SmallImg = styled.div`
  width: 378px;
  height: 78px;
  background-image: url(${guide2_2});
  background-size: cover;
  background-position: center;
  box-shadow: 0 10px 10px 10px rgba(0, 0, 0, 0.045);
  position: absolute;
  bottom: 41.9%;
  left: 27%;
`;

const GreyText = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #878e95;
  letter-spacing: -0.64pt;
`;

const Buttons = styled.div`
  width: 756px;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto 32px;
  letter-spacing: -4%;
  font-size: 20px;
  line-height: 28px;
  /* position: relative; */
`;

const Btn = styled.div`
  width: 82px;
  height: 44px;
  color: #0028fa;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CircleBox = styled.div`
  width: 104px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Circle = styled.div`
  width: 8px;
  height: 8px;
  background: #eaecef;
  border-radius: 100%;
  cursor: pointer;
`;

export default ManualModal;
