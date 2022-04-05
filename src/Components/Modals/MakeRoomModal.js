import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import close from "./Images/Close.svg";
import greyEye from "./Images/MakeRoomModal_GreyEye.png";
import blackEye from "./Images/MakeRoomModal_BlackEye.png";
import checkBox from "./Images/MakeRoomModal_CheckBox.png";
import noneCheckBox from "./Images/MakeRoomModal_NoneCheckBox.png";
import youtubeLogo from "./Images/MakeRoomModal_Youtube.svg";
import Dropdown from "../Common/Dropdown";
import DropdownArrowIcon from "./Images/MakeRoomModal_ArrowIcon.svg";
import {
  _parserVideoId,
  _getVideoInfo,
} from "../Common/Functions/YoutubeDataAPI";
import { actionCreators as roomActions } from "../../redux/modules/room";
import RecommendModal from "./RecommendModal";
const MakeRoomModal = (props) => {
  const dispatch = useDispatch();

  // 모달창
  const { setIsMakeModal } = props;
  const modal = React.useRef();
  // 셀렉트탭
  const [clickedDifficulty, setClickedDifficulty] = React.useState();
  const difficultyList = ["낮음", "보통", "높음"];
  const [clickedStartTime, setClickedStartTime] = React.useState();
  const startTimeList = ["1분 뒤", "5분 뒤", "10분 뒤"];
  // 태그선택
  const $RoomNameInput = React.useRef();
  const $LinkInput = React.useRef();

  const [clickedCategory, setClickedCategory] = React.useState();

  // textarea 입력된 글자수체크
  const [inputTextarea, setTextarea] = React.useState("");
  const onChange = (e) => {
    setTextarea(e.target.value);
  };
  // 추천영상관련
  const [isRecommend, setIsRecommend] = React.useState(false);
  React.useEffect(() => {
    $LinkInput.current.addEventListener("focus", () => {
      setIsRecommend(true);
    });

    $LinkInput.current.addEventListener("input", () => {
      if ($LinkInput.current.value) {
        setIsRecommend(false);
      } else {
        setIsRecommend(true);
      }
    });
  }, []);

  // 비밀방관련
  const [isSecret, setIsSecret] = React.useState(false);
  const $pwInput = React.useRef();
  const $pwInputBox = React.useRef();
  const $postMessage = React.useRef();
  const [pwInputWrong, setPwInputWrong] = React.useState(false);
  const [isStar, setIsStar] = React.useState(true);
  const checkSecret = (e) => {
    setIsSecret(!isSecret);
    if (isSecret) {
      $pwInputBox.current.style.pointerEvents = "none";
      $pwInput.current.value = "";
      setPwInputWrong(false);
    } else {
      $pwInputBox.current.style.pointerEvents = "auto";
    }
  };
  const pwOnkeydown = (e) => {
    let code = e.keyCode;

    if (
      (code > 47 && code < 58) ||
      (code > 95 && code < 106) ||
      e.keyCode === 8
    ) {
      if ($pwInput.current.value.length < 3) {
        setPwInputWrong(true);
      } else {
        setPwInputWrong(false);
      }
      return;
    }
    setPwInputWrong(true);
    e.preventDefault();
  };
  const changePwInputType = () => {
    setIsStar(!isStar);
  };

  // 카테고리값받아오기_ 자식 컴포넌트에서 부모컴포넌트로 값 전달방법 props에 함수 넘겨줌
  const categoryList = [
    "근력 운동",
    "유산소 운동",
    "스트레칭",
    "요가/필라테스",
    "기타",
  ];
  const getCategory = (category) => {
    setClickedCategory(category);
  };

  const clickMakeBtn = () => {
    // 미입력시 알림창띄우기 => 나중에 이쁜 모달이나 글자가 흔들리는걸로 변경하기
    const checkInputArray = [
      $RoomNameInput.current.value,
      difficultyList[clickedDifficulty],
      categoryList[clickedCategory],
      $LinkInput.current.value,
      startTimeList[clickedStartTime],
    ];

    let alert = [
      "방제목을 입력해주세요",
      "운동 난이도를 선택해주세요",
      "카테고리를 선택해주세요",
      "링크를 입력해주세요",
      "시작 시간을 설정해주세요",
    ];
    for (let i = 0; i < checkInputArray.length; i++) {
      if (!checkInputArray[i]) {
        window.alert(alert[i]);
        return;
      }
    }
    if (
      isSecret &&
      ($pwInput.current.value === "" ||
        $pwInput.current.value.length < 4 ||
        $pwInput.current.value.length > 8 ||
        isNaN($pwInput.current.value))
    ) {
      window.alert("비밀번호는 숫자 4~8자 사이로 입력해주세요");
      return;
    }

    let videoId = _parserVideoId($LinkInput.current.value);
    if (!videoId) {
      // 유튜브 링크 형식이 아닌 것을 올렸을 때 리턴처리
      window.alert("유튜브 링크가 올바른지 확인해주세요");
      return;
    }
    //youtubeDataApi를 이용하여 입력받은 링크를 가지고 비디오데이터를 받아온뒤 서버 api에 보낼 데이터로 정제 후 보내기
    _getVideoInfo(videoId)
      .then((v) => {
        const roomInfo = {
          roomTitle: $RoomNameInput.current.value,
          videoThumbnail: v.thumbnail,
          videoLength: v.duration,
          videoUrl: $LinkInput.current.value,
          videoTitle: v.title,
          videoStartAfter: +startTimeList[clickedStartTime].split("분")[0],
          category: categoryList[clickedCategory],
          difficulty: difficultyList[clickedDifficulty],
          password: isSecret ? $pwInput.current.value : "",
        };
        dispatch(roomActions.addRoomDB(roomInfo));
      })
      .catch((err) => {
        // 유튜브 링크 형식이지만 정보가 없는 것을 리턴처리
        window.alert("현재 해당 영상의 정보를 받아올 수 없어요");
        return;
      });
  };

  return (
    <Background>
      <MakeRoomContainer ref={modal}>
        <MakeRoomHeader className="boldText">
          방 만들기
          <img
            src={close}
            alt="엑스 아이콘"
            onClick={() => {
              setIsMakeModal(false);
            }}
            style={{ cursor: "pointer" }}
          />
        </MakeRoomHeader>
        <MakeRoomNameBox>
          <Label style={{ margin: "42px 0px 14px 0px" }}>
            <p className="boldText">방 이름</p>
            <p style={{ fontSize: "16px" }}>{inputTextarea.length} / 50자</p>
          </Label>
          <RoomNameInput
            maxLength={50}
            type="text"
            placeholder="생성할 방의 이름을 입력해주세요"
            ref={$RoomNameInput}
            onChange={onChange}
          />
        </MakeRoomNameBox>
        <MakeRoomOptionBox>
          <SelectBox>
            <p className="boldText">난이도</p>
            <div style={{ display: "flex" }}>
              {difficultyList.map((e, i) => (
                <DB_EL
                  key={i}
                  onClick={() => {
                    setClickedDifficulty(i);
                  }}
                  style={{
                    color: clickedDifficulty === i ? "#FFF" : "",
                    background: clickedDifficulty === i ? "#667EFC" : "",
                    fontWeight: clickedDifficulty === i ? "600" : "",
                  }}
                >
                  {e}
                </DB_EL>
              ))}
            </div>
          </SelectBox>
          <CategoryBox>
            <p className="boldText" style={{ margin: "14px 0px" }}>
              운동종류
            </p>
            <Dropdown
              dropdownList={categoryList}
              getCategory={getCategory}
              background="#D9DFFE"
              fontcolor="#878E95"
              width="276px"
            >
              운동 카테고리를 골라주세요
            </Dropdown>
          </CategoryBox>
        </MakeRoomOptionBox>
        <LinkInputContainer>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="boldText">운동 영상 링크</p>

            <a
              href="https://www.youtube.com/results?search_query=%ED%99%88%ED%8A%B8"
              target="_blank"
              className="youtubeLinkText"
              color="#878e95"
              rel="noreferrer"
            >
              <img
                src={youtubeLogo}
                style={{
                  width: "20px",
                  paddingTop: "1px",
                  WebkitUserDrag: "none",
                  margin: "0px 4px 0px 16px",
                }}
                alt="유튜브로고"
              />
              유튜브에서 운동 영상 찾아보기
            </a>
          </div>
          <LinkInputBox>
            <LinkInput
              type="text"
              placeholder="운동 영상의 링크를 직접 입력하거나, 추천 영상을 선택해주세요"
              ref={$LinkInput}
            />
            <div
              className="arrowIconBox"
              onClick={() => {
                setIsRecommend(!isRecommend);
              }}
            >
              추천 영상 보기
              <img
                src={DropdownArrowIcon}
                alt="드롭다운화살표"
                style={{ marginLeft: "2px" }}
              ></img>
            </div>
            {isRecommend && (
              <RecommendModal
                $LinkInput={$LinkInput}
                setIsRecommend={setIsRecommend}
              ></RecommendModal>
            )}
          </LinkInputBox>
        </LinkInputContainer>
        <SettingContainer>
          <SelectBox style={{ width: "60%" }}>
            <p className="boldText">시작 시간 설정</p>
            <div style={{ display: "flex" }}>
              {startTimeList.map((e, i) => (
                <DB_EL
                  key={i}
                  onClick={() => {
                    setClickedStartTime(i);
                  }}
                  style={{
                    padding: "8px 14px",
                    margin: "14px 15px 0 0",
                    color: clickedStartTime === i ? "#FFF" : "",
                    background: clickedStartTime === i ? "#667EFC" : "",
                    fontWeight: clickedStartTime === i ? "600" : "",
                  }}
                >
                  {e}
                </DB_EL>
              ))}
            </div>
          </SelectBox>
          <PwInputContainer>
            <p
              className="boldText"
              style={{ display: "flex", alignItems: "center", height: "21px" }}
            >
              비밀방 여부
              <img
                src={isSecret ? checkBox : noneCheckBox}
                alt="비밀방여부체크박스"
                className="scaleHalf"
                onClick={checkSecret}
                style={{ WebkitUserDrag: "none", cursor: "pointer" }}
              ></img>
            </p>
            <PwInputBox ref={$pwInputBox}>
              <PwInput
                type={isStar ? "password" : "text"}
                placeholder="비밀번호를 입력해주세요"
                ref={$pwInput}
                maxLength={8}
                onKeyDown={pwOnkeydown}
                pwInputWrong={pwInputWrong}
              />

              <EyeImg
                src={isStar ? greyEye : blackEye}
                className="scaleHalf"
                onClick={changePwInputType}
                style={{ WebkitUserDrag: "none" }}
              />
            </PwInputBox>

            <PwMessage ref={$postMessage} pwInputWrong={pwInputWrong}>
              비밀번호는 숫자 4~8자 사이로 입력해주세요
            </PwMessage>
          </PwInputContainer>
        </SettingContainer>
        <BtnBox>
          <CancelBtn
            onClick={() => {
              setIsMakeModal(false);
            }}
          >
            취소하기
          </CancelBtn>
          <MakeBtn
            onClick={() => {
              clickMakeBtn();
            }}
          >
            만들기
          </MakeBtn>
        </BtnBox>
      </MakeRoomContainer>
    </Background>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MakeRoomContainer = styled.div`
  width: 668px;
  height: 760px;
  background: #ffffff;
  border-radius: 12px;
  padding: 48px;
  font-size: 18px;
  color: #878e95;
  z-index: 14;
  .boldText {
    font-weight: 700;
    color: #000000;
  }
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1360px) {
    transform: scale(0.8);
  }

  .scaleHalf {
    transform: scale(0.5);
  }
`;
const MakeRoomHeader = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f1f3f5;
  padding-bottom: 32px;
  display: flex;
`;

const MakeRoomNameBox = styled.div``;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
`;
const RoomNameInput = styled.textarea`
  width: 572px;
  height: 72px;
  border-radius: 8px;
  background-color: #f1f3f5;
  padding: 12px;
  resize: none;
  border: none;
  &::placeholder {
    color: #878e95;
    font-size: 16px;
  }
  font-size: 18px;
  outline: none;
`;

const MakeRoomOptionBox = styled.div`
  display: flex;
  align-items: center;
  height: 102px;
`;
const SelectBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 32px;
  width: 60%;
`;
const DB_EL = styled.div`
  margin: 14px 20px 0 0;
  padding: 0px 20px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #eaecef;
  color: #878e95;
  cursor: pointer;
`;
const CategoryBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flex-direction: column;
`;

const LinkInputContainer = styled.div`
  margin-top: 32px;

  .youtubeLinkText {
    font-size: 14px;
    font-weight: normal;
    line-height: 1.43;
    letter-spacing: -0.56px;
    text-align: left;
    display: flex;
    align-items: center;
  }
  a:link {
    color: #878e95;
  }
  a:visited {
    color: #878e95;
  }
  a:hover {
    color: red;
  }
  a:active {
    color: #878e95;
  }
`;

const LinkInputBox = styled.div`
  position: relative;
  .arrowIconBox {
    font-size: 14px;
    font-weight: normal;
    line-height: 1.43;
    color: #4a5056;
    letter-spacing: -0.56px;
    position: absolute;
    color: #4a5056;
    right: 12px;
    top: 48%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .arrowIcon {
    font-size: 18px;
  }
`;

const LinkInput = styled.input`
  width: 572px;
  height: 48px;
  border-radius: 8px;
  background-color: #f1f3f5;
  padding: 12px 118px 12px 12px;
  resize: none;
  border: none;
  &::placeholder {
    color: #878e95;
    font-size: 16px;
  }
  margin-top: 14px;
  font-size: 18px;
  outline: none;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  justify-content: space-between;
  margin-top: 24px;
`;
const CancelBtn = styled.div`
  width: 165px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: solid 1px #aeb5bc;
  background-color: #fff;
  cursor: pointer;
`;
const MakeBtn = styled.div`
  width: 392px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: #0028fa;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const SettingContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;
const PwInputContainer = styled.div`
  margin-top: 32px;
  width: 50%;
`;
const PwInputBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  pointer-events: none;
`;
const PwInput = styled.input`
  width: 276px;
  height: 40px;
  border-radius: 8px;
  background-color: #f1f3f5;
  padding: 12px;
  resize: none;
  border: none;
  // outline: none;
  &::placeholder {
    color: #878e95;
    font-size: 16px;
  }
  margin-top: 14px;
  font-size: 18px;
  // .pwInputWrong {
  //   border: 1px #f7444e solid;
  // }
  &:focus {
    ${(props) => (props.pwInputWrong ? `outline:1px #f7444e solid;` : "")}
  }
`;
const EyeImg = styled.img`
  position: absolute;
  right: 6px;
  bottom: 5px;
`;

const PwMessage = styled.div`
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.48px;
  margin: 4px 0px 0px 2px;
  .pwInputWrong {
    color: #f7444e;
  }
  ${(props) => (props.pwInputWrong ? `color: #f7444e;` : "")}
`;

export default MakeRoomModal;
