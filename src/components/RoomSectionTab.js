import React from "react";
import styled from "styled-components";
import fire from "../Images/RoomSectionIcon_fire.png";
import Reload from "../Images/RoomSectionIcon_Reload.png";
import Dropdown from "./Dropdown";
import MakeRoomModal from "./MakeRoomModal";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as roomActions } from "../redux/modules/room";

const RoomSectionTop = () => {
  const DifficultyList = ["전체", "초급", "중급", "고급"];
  const [clickedDifficulty, setClickedDifficulty] = React.useState(0);
  const [isModal, setIsModal] = React.useState();

  // 카테고리값받아오기_ 자식 컴포넌트에서 부모컴포넌트로 값 전달방법 props에 함수 넘겨줌
  const dropdownList = [
    "전체",
    "스트레칭",
    "요가",
    "필라테스",
    "근력운동",
    "타바타",
  ];
  const dispatch = useDispatch();
  const [clickedCategory, setClickedCategory] = React.useState();
  React.useEffect(() => {
    dispatch(roomActions.getRoomDB(clickedDifficulty, clickedCategory));
  }, [clickedCategory, clickedDifficulty]);

  const getCategory = (category) => {
    setClickedCategory(category);
  };
  return (
    <>
      {isModal && (
        <MakeRoomModal
          setIsModal={setIsModal}
          isModal={isModal}
        ></MakeRoomModal>
      )}
      <RoomSectionTopContainer>
        <RoomSectionTitle>
          <img src={fire} alt="불꽃 아이콘" style={{ marginRight: "4px" }} />
          00님을 기다리고 있는 방이에요, 참가해보세요!
          <img
            src={Reload}
            alt="리로드 아이콘"
            style={{ marginLeft: "12px" }}
            className="reload"
          />
        </RoomSectionTitle>
        <RoomSectionContent>
          <RoomSectionCategory>
            <DifficultyBox>
              <p style={{ marginRight: "4px" }}>난이도</p>
              {DifficultyList.map((e, i) => (
                <DB_EL
                  key={i}
                  onClick={() => {
                    setClickedDifficulty(i);
                  }}
                  style={{
                    color: clickedDifficulty === i ? "#FFF" : "",
                    background: clickedDifficulty === i ? "#222529" : "",
                  }}
                >
                  {e}
                </DB_EL>
              ))}
            </DifficultyBox>
            <CategoryBox>
              <p>운동종류</p>
              <Dropdown dropdownList={dropdownList} getCategory={getCategory}>
                어떤 운동을 찾고 계신가요?
              </Dropdown>
            </CategoryBox>
          </RoomSectionCategory>
          <MakeRoomBtn
            onClick={() => {
              setIsModal(true);
            }}
          >
            방만들기
          </MakeRoomBtn>
        </RoomSectionContent>
      </RoomSectionTopContainer>
    </>
  );
};
const RoomSectionTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1360px) {
    width: 100%;
  }
`;
const RoomSectionTitle = styled.div`
  color: #222529;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  .reload:hover {
    transform: rotate(-110deg);
    transition: transform 0.3s linear;
  }
`;
const RoomSectionContent = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  justify-content: space-between;
  margin: 28px 0px 35px 0;
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
  height: 48px;
  border-radius: 20px;
  background-color: #222529;
  font-size: 24px;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1360px) {
    width: 221px;
  }
`;
export default RoomSectionTop;
