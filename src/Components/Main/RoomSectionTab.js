import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import fire from './Images/Fire.svg';
import Reload from './Images/RoomSectionTab_Reload.svg';

import Dropdown from '../Common/Dropdown';
import MakeRoomModal from '../Modals/MakeRoomModal';
import { actionCreators as roomActions } from '../../redux/modules/room';

const RoomSectionTop = (props) => {
  const dispatch = useDispatch();
  const is_local = localStorage.getItem('isLogin');

  const nickName = useSelector((state) => state.user.nickname);

  const [clickedDifficulty, setClickedDifficulty] = React.useState(0);
  const [isMakeModal, setIsMakeModal] = React.useState();

  const DifficultyList = ['전체', '낮음', '보통', '높음'];
  // 카테고리값받아오기_ 자식 컴포넌트에서 부모컴포넌트로 값 전달방법 props에 함수 넘겨줌
  const categoryList = ['전체', '근력 운동', '유산소 운동', '스트레칭', '요가/필라테스', '기타'];
  const [clickedCategory, setClickedCategory] = React.useState();

  // roomList 새로고침하기
  const clickReload = () => {
    dispatch(roomActions.getRoomDB(clickedDifficulty, clickedCategory));
  };

  const getCategory = (category) => {
    setClickedCategory(category);
  };

  React.useEffect(() => {
    dispatch(roomActions.getRoomDB(clickedDifficulty, clickedCategory));
  }, [clickedCategory, clickedDifficulty]);

  return (
    <>
      {isMakeModal && <MakeRoomModal setIsMakeModal={setIsMakeModal} isMakeModal={isMakeModal}></MakeRoomModal>}
      <RoomSectionTopContainer>
        <RoomSectionTitle>
          <div
            style={{
              width: '24px',
              height: '25px',
              display: 'flex',
              alignItems: 'center',
              marginRight: '4px',
            }}
          >
            <img src={fire} alt="불꽃 아이콘" width="24" />
          </div>

          {is_local ? `${nickName}님을 기다리고 있는 방이에요, 참가해보세요!` : '참가를 기다리고 있는 방이에요, 로그인 후 함께해요!'}

          <img src={Reload} alt="리로드 아이콘" style={{ marginLeft: '12px', cursor: 'pointer' }} className="reload" onClick={clickReload} />
          {/* <MakeRoomBtn className="isEntering" onClick={enteringHandler}>
            입장 가능!!!!
          </MakeRoomBtn> */}
        </RoomSectionTitle>
        <RoomSectionContent>
          <RoomSectionCategory>
            <DifficultyBox>
              <p style={{ marginRight: '4px' }}>난이도</p>
              {DifficultyList.map((e, i) => (
                <DB_EL
                  key={i}
                  onClick={() => {
                    setClickedDifficulty(i);
                  }}
                  style={{
                    color: clickedDifficulty === i ? '#FFF' : '',
                    background: clickedDifficulty === i ? '#667EFC' : '',
                  }}
                >
                  {e}
                </DB_EL>
              ))}
            </DifficultyBox>
            <CategoryBox>
              <p>운동종류</p>
              <Dropdown dropdownList={categoryList} getCategory={getCategory} background="#D9DFFE" fontcolor="#878E95">
                어떤 운동을 찾고 계신가요?
              </Dropdown>
            </CategoryBox>
          </RoomSectionCategory>
          <MakeRoomBtn
            onClick={() => {
              if (!is_local) {
                props.setIsLoginModal(true);
                return;
              }
              setIsMakeModal(true);
              // document.body.style.overflow = 'hidden';
            }}
          >
            방 만들기
          </MakeRoomBtn>
        </RoomSectionContent>
      </RoomSectionTopContainer>
    </>
  );
};
const RoomSectionTopContainer = styled.div`
  width: 1320px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1360px) {
    width: 100%;
  }
`;
const RoomSectionTitle = styled.div`
  color: #222529;
  color: #222529;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.96pt;
  font-weight: 700;
  display: flex;
  align-items: center;
  .reload:hover {
    transform: rotate(80deg);
    transition: transform 0.2s linear;
  }
`;

const RoomSectionContent = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  justify-content: space-between;
  margin: 24px 0px;
`;

const RoomSectionCategory = styled.div`
  display: flex;
`;

const DifficultyBox = styled.div`
  display: flex;
  align-items: center;
`;
const DB_EL = styled.div`
  margin: 7px 8px;
  padding: 7px 16px;
  border-radius: 8px;
  background-color: #eaecef;
  color: #878e95;
  cursor: pointer;
  :hover {
    background-color: #d9dffe;
  }
`;
const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  & > p {
    margin: 0 16px 0 38px;
    @media screen and (max-width: 1360px) {
      margin: 0 16px 0 10px;
    }
  }
`;

const MakeRoomBtn = styled.div`
  width: 315px;
  height: 44px;
  border-radius: 20px;
  background-color: #0028fa;
  font-size: 24px;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: 1360px) {
    width: 221px;
  }
`;
export default RoomSectionTop;
