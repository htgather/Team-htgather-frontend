import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import blackEye from "./Images/MakeRoomModal_BlackEye.png";
import greyEye from "./Images/MakeRoomModal_GreyEye.png";

import close from "./Images/Close.svg";
import { actionCreators as roomActions } from "../../redux/modules/room";

const PasswordModal = (props) => {
  const roomInfo = props.roomInfo;
  const dispatch = useDispatch();

  const [inputTextarea, setTextarea] = React.useState("");
  const [typePwd, setTypePwd] = React.useState(true);
  const [pwdUnfiiled, setPwdUnfilled] = React.useState(false);
  const [wrongPwd, setWrongPwd] = React.useState(false);
  const [pwInputWrong, setPwInputWrong] = React.useState(null);
  const PwdInputBox = React.useRef();
  const onChange = (e) => {
    const text = e.target.value;
    setTextarea(text);
    if (text.length <= inputTextarea.length) {
      setWrongPwd(false);
    }
    if (text.length > 0) {
      setPwdUnfilled(false);
    }
  };

  const onFocus = (e) => {
    setPwdUnfilled(false);
    setWrongPwd(false);
    setTextarea("");
  };

  const pwOnkeydown = (e) => {
    let code = e.keyCode;
    if (
      (code > 47 && code < 58) ||
      (code > 95 && code < 106) ||
      e.keyCode === 8
    ) {
      setPwInputWrong(false);
      return;
    }
    if (code === 13) {
      checkPWDnEnterRoom();
      return;
    }
    setPwInputWrong(true);
    e.preventDefault();
  };

  const showPwd = () => {
    setTypePwd(!typePwd);
  };

  const checkPWDnEnterRoom = () => {
    if (inputTextarea === roomInfo.password) {
      dispatch(roomActions.joinRoomDB(roomInfo._id));
    } else if (inputTextarea === "") {
      setPwInputWrong(true);
      setPwdUnfilled(true);
    } else if (inputTextarea !== roomInfo.password) {
      setWrongPwd(true);
      setPwInputWrong(true);
    }
  };

  // const onKeyPress = (e) => {
  //   if (e.keyCode === "13") {
  //     console.log("이게 과연 되는가");
  //   }
  // };

  // 모달창
  const { setPwdCheck } = props;
  const modal = React.useRef();

  return (
    <Background
      onClick={() => {
        // setIsMakeModal(false);
        // document.body.style.overflow = "unset";
      }}
    >
      <MakeRoomContainer
        ref={modal}
        // onClick={(e) => e.stopPropagation()}
      >
        <MakeRoomHeader className="boldText">
          <img
            src={close}
            alt="엑스 아이콘"
            onClick={() => {
              setPwdCheck(false);
              // document.body.style.overflow = "unset";
            }}
            style={{ cursor: "pointer" }}
          />
        </MakeRoomHeader>
        <h1 className="boldText">비밀번호를 입력해주세요</h1>
        <p className="pwdMessage">비밀번호는 숫자 4~8자 사이로 입력해주세요</p>

        <div>
          <PwdInputDiv>
            <PwdInput
              type={typePwd ? "password" : "text"}
              id="PWD"
              placeholder="비밀번호"
              maxLength={8}
              onChange={onChange}
              onFocus={onFocus}
              onKeyDown={pwOnkeydown}
              pwInputWrong={pwInputWrong}
              oni
            ></PwdInput>
            <EyeImg
              src={typePwd ? greyEye : blackEye}
              alt="비밀번호 확인"
              className="checkPwd"
              onClick={showPwd}
            />
          </PwdInputDiv>

          {pwdUnfiiled && (
            <PwdUnfilledMessage>비밀번호를 입력해주세요</PwdUnfilledMessage>
          )}
          {wrongPwd && (
            <PwdUnfilledMessage>잘못된 비밀번호입니다</PwdUnfilledMessage>
          )}
        </div>

        <BtnBox>
          <MakeBtn onClick={checkPWDnEnterRoom}>비밀방 입장하기</MakeBtn>
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
  z-index: 100;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MakeRoomContainer = styled.div`
  width: 661px;
  height: 442px;
  background: #ffffff;
  border-radius: 12px;
  padding: 48px;
  font-size: 18px;
  color: #878e95;
  position: fixed;
  z-index: 100;
  .boldText {
    font-weight: 700;
    color: #000000;
    margin-bottom: 10px;
  }
  .pwdMessage {
    margin: 10px auto 13px auto;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PwdInputDiv = styled.div`
  position: relative;
  align-items: center;
`;

const PwdInput = styled.input`
  width: 400px;
  height: 40px;
  border-radius: 8px;
  background-color: #f1f3f5;
  padding: 16px;
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
  outline: ${(props) => (props.pwInputWrong ? "1px #f7444e solid" : "")};
`;
const EyeImg = styled.img`
  width: 16px;
  height: 16px;
  position: absolute;
  right: 16px;
  bottom: 11px;
`;

// const PwdInputDiv = styled.div`
//   width: 400px;
//   height: 40px;
//   border-radius: 8px;
//   background-color: #f1f3f5;
//   resize: none;
//   border: none;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   &::placeholder {
//     color: #878e95;
//     font-size: 16px;
//   }
//   margin: 13px auto 20px auto;
//   padding-left: 10px;
//   font-size: 18px;
//   .checkPwd {
//     margin-right: 10px;
//     width: 20px;
//     cursor: pointer;
//     &:focus {
//     ${(props) => (props.pwInputWrong ? "" : `border:1px #f7444e solid;`)}
//   }
// `;

// const PwdInput = styled.input`
//   width: 350px;
//   height: 30px;
//   border-radius: 8px;
//   background-color: #f1f3f5;
//   &::placeholder {
//     color: #878e95;
//     font-size: 16px;
//   }
//   outline: none;
//   resize: none;
//   border: none;
//   padding-left: 10px;
// `;

const PwdUnfilledMessage = styled.div`
  position: absolute;
  font-size: 12px;
  bottom: 165px;
  left: 135px;
  color: red;
`;

const MakeRoomHeader = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 32px;
  top: 32px;
  z-index: 15;
  cursor: pointer;
`;

const BtnBox = styled.div``;

const MakeBtn = styled.div`
  width: 269px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: #0028fa;
  font-weight: bold;
  color: white;
  cursor: pointer;
  margin-top: 40px;
`;

export default PasswordModal;
